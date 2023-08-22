import { Card, CardContent, IconButton, MenuItem, Menu, TextField } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useState, MouseEvent, useMemo, useEffect } from 'react';
import EllipsisIcon from '@components/svgs/EllipsisIcon';
import classes from './TimeTracker.module.scss';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTask, deleteTask, getTasks, updateTask } from 'api/tasks/tasks-api';
import { Controller, useForm } from 'react-hook-form';
import { CreateTaskReq } from 'api/tasks/models/create-task/create-task-req.model';
import { useNotificationStore } from 'store/store';
import { useTimeTracker } from 'hooks/useTimeTracker';
import { UpdateTaskReq } from 'api/tasks/models/update-task/update-task-req.model';

const TimeTracker = () => {
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);
  const showNotification = useNotificationStore((state) => state.showNotification);
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery('tasks', getTasks);
  const { isLoading: isCreateTaskLoading, mutate: createTaskReq } = useMutation(createTask);
  const { mutate: updateTaskReq } = useMutation(updateTask);
  const { mutate: deleteTaskReq } = useMutation(deleteTask);

  const formattedTime = useTimeTracker(tasks || []);

  const { control, getValues, reset } = useForm({
    defaultValues: {
      description: '',
    },
  });

  useEffect(() => {
    const task = tasks?.find((t) => {
      return !t?.endTime;
    });

    if (task) {
      reset({
        description: task?.description,
      });
    }
  }, [tasks, reset]);

  const openOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    setOptionsAnchor(event.currentTarget);
  };

  const closeOptionsMenu = () => {
    setOptionsAnchor(null);

    if (!task) return;

    deleteTaskReq(task.id?.toString(), {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        showNotification('Task deleted successfully!', 'success');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const startTimer = () => {
    const { description } = getValues() || {};
    const requestBody: CreateTaskReq = { description, startTime: new Date().toISOString() };

    createTaskReq(requestBody, {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        showNotification('Task added successfully!', 'success');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const stopTimer = () => {
    if (!task) return;

    const { description } = getValues() || {};

    const requestBody: UpdateTaskReq = {
      description: description,
      startTime: task.startTime,
      endTime: new Date().toISOString(),
    };

    updateTaskReq(
      { reqBody: requestBody, taskId: task?.id?.toString() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
          reset({
            description: '',
          });
          showNotification('Task Updated successfully!', 'success');
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
          showNotification(errorMessage);
        },
      }
    );
  };

  const { task, isTimerRunning } = useMemo(() => {
    const task = tasks?.find((t) => {
      return !t?.endTime;
    });

    if (task) {
      return {
        task: task,
        isTimerRunning: true,
      };
    }

    return {
      task: null,
      isTimerRunning: false,
    };
  }, [tasks]);

  return (
    <>
      <Card className={`${classes.trackerCard} ${isCreateTaskLoading ? classes.loading : ''}`}>
        <CardContent>
          <header className={classes.header}>
            <h2 className={classes.headerTitle}>Time Tracker</h2>
            <div className={classes.headerOptions}>
              <IconButton onClick={openOptionsMenu}>
                <EllipsisIcon />
              </IconButton>
              <Menu open={!!optionsAnchor} anchorEl={optionsAnchor} onClose={closeOptionsMenu} elevation={4}>
                <MenuItem
                  className={classes.optionMenuItem}
                  onClick={closeOptionsMenu}
                  disabled={!isTimerRunning}
                >
                  Discard
                </MenuItem>
              </Menu>
            </div>
          </header>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                maxRows={4}
                fullWidth
                size="small"
                label="Enter description"
                variant="outlined"
                {...field}
              />
            )}
          />

          <h3 className={classes.timerText}>{formattedTime}</h3>

          <div className={classes.actionBtnWrapper}>
            {isTimerRunning ? (
              <IconButton onClick={stopTimer}>
                <StopCircleIcon className={`${classes.icon} ${classes.stop}`} />
              </IconButton>
            ) : (
              <IconButton onClick={startTimer}>
                <PlayCircleIcon className={`${classes.icon} ${classes.play}`} />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeTracker;
