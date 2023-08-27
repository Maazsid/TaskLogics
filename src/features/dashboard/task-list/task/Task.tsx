import { TextField, IconButton, Menu, MenuItem, Chip, Tooltip } from '@mui/material';
import { SyntheticEvent, useState, MouseEvent, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EllipsisIcon from '@components/svgs/EllipsisIcon';
import classes from './Task.module.scss';
import { getFormattedTime, getHoursAndMinutesFromDate } from 'utils/utils';
import { GroupedTask, GroupedTaskItem } from '@features/dashboard/models/task-list.model';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTask, deleteTask, getTasks, updateTask } from 'api/tasks/tasks-api';
import { UpdateTaskReq } from 'api/tasks/models/update-task/update-task-req.model';
import { useNotificationStore } from 'store/store';
import dayjs, { Dayjs } from 'dayjs';
import { CreateTaskReq } from 'api/tasks/models/create-task/create-task-req.model';

const Task = ({ task, numberOfSubItems }: TaskProps) => {
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);
  const { mutate: updateTaskReq, mutateAsync: updateTaskReqAsync } = useMutation(updateTask);
  const { mutate: deleteTaskReq, mutateAsync: deleteTaskReqAsync } = useMutation(deleteTask);
  const { mutate: createTaskReq } = useMutation(createTask);
  const showNotification = useNotificationStore((state) => state.showNotification);
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery('tasks', getTasks);

  const { control, getValues, reset, resetField } = useForm({
    defaultValues: {
      description: task?.description,
      startDate: dayjs(task?.startTime)?.format('hh:mm A'),
      endDate: dayjs(task?.endTime)?.format('hh:mm A'),
    },
  });

  useEffect(() => {
    reset({
      description: task?.description,
      startDate: dayjs(task?.startTime)?.format('hh:mm A'),
      endDate: dayjs(task?.endTime)?.format('hh:mm A'),
    });
  }, [task, reset]);

  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const onInputBlur = async () => {
    let { description } = getValues() || {};

    description = description?.trim();

    const isDescriptionNotChanged = description === task?.description;
    const isDescriptionEmpty = !description && !task?.description;

    if (isDescriptionNotChanged || isDescriptionEmpty) return;

    if (task?.groupedTasks && task?.groupedTasks?.length > 1) {
      const taskUpdateRequests = task?.groupedTasks?.map((t) => {
        const requestBody: UpdateTaskReq = {
          description: description,
          startTime: t?.startTime,
          endTime: t?.endTime,
        };

        return updateTaskReqAsync({ reqBody: requestBody, taskId: t?.id?.toString() });
      });

      try {
        await Promise.all(taskUpdateRequests);
        queryClient.invalidateQueries('tasks');
        showNotification('Tasks Updated successfully!', 'success');
      } catch (error: any) {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      }

      return;
    }

    updateTaskFn(task?.startTime, task?.endTime, description);
  };

  const onStartDateBlur = () => {
    const { startDate } = getValues() || {};

    const { dayjsDate: customStartDate, isInvalid } = convertInputDateToDayjsDate(startDate);

    if (isInvalid || !customStartDate) {
      resetField('startDate');
      return;
    }

    const endDate = dayjs(task?.endTime);

    const isStartDateNotChanged =
      customStartDate?.format('hh:mm A') === dayjs(task?.startTime)?.format('hh:mm A');

    if (isStartDateNotChanged) {
      resetField('startDate');
      return;
    }

    const isStartDateBeforeEndDate = customStartDate.isBefore(endDate, 'minute');

    if (!isStartDateBeforeEndDate) {
      resetField('startDate');
      return;
    }

    updateTaskFn(customStartDate?.toISOString(), endDate?.toISOString(), task?.description);
  };

  const onEndDateBlur = () => {
    const { endDate } = getValues() || {};

    const { dayjsDate: customEndDate, isInvalid } = convertInputDateToDayjsDate(endDate);

    if (isInvalid || !customEndDate) {
      resetField('endDate');
      return;
    }

    const startDate = dayjs(task?.startTime);

    const isEndDateNotChanged = customEndDate?.format('hh:mm A') === dayjs(task?.endTime)?.format('hh:mm A');

    if (isEndDateNotChanged) {
      resetField('endDate');
      return;
    }

    const isEndDateAfterStartDate = customEndDate.isAfter(startDate, 'minute');

    if (!isEndDateAfterStartDate) {
      resetField('endDate');
      return;
    }

    updateTaskFn(startDate?.toISOString(), customEndDate?.toISOString(), task?.description);
  };

  const updateTaskFn = (startDate: string, endDate: string, description: string) => {
    const requestBody: UpdateTaskReq = {
      description: description,
      startTime: startDate,
      endTime: endDate,
    };

    updateTaskReq(
      { reqBody: requestBody, taskId: task?.id?.toString() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
          showNotification('Task Updated successfully!', 'success');
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
          showNotification(errorMessage);
        },
      }
    );
  };

  const convertInputDateToDayjsDate = (inputDate: string): { dayjsDate?: Dayjs; isInvalid: boolean } => {
    const dateFormatPattern = /(^\d{1,4}\s*[a,p]?m?$)|(^\d{1,2}:\d{1,2}\s*[a,p]?m?$)/gi;
    const isValidDateFormat = dateFormatPattern?.test(inputDate);

    if (!isValidDateFormat) return { isInvalid: true };

    inputDate = inputDate?.replace(/\s/g, '');
    inputDate = inputDate?.toLowerCase();

    const isTwelveHourFormat = inputDate?.includes('a') || inputDate?.includes('p');

    const { hhNumber, mmNumber, hh, mm } = getHoursAndMinutesFromDate(inputDate);

    let dayjsDate: Dayjs;

    if (isTwelveHourFormat) {
      if (hhNumber < 1 || hhNumber > 12 || mmNumber > 60) {
        resetField('startDate');
        return { isInvalid: true };
      }

      const datePart = dayjs(task?.startTime)?.format('YYYY-MM-DD');
      const datePartSeconds = dayjs(task?.startTime)?.format('ss');
      const datePartMeridiem = inputDate?.includes('a') ? 'AM' : 'PM';

      dayjsDate = dayjs(
        `${datePart} ${hh}:${mm}:${datePartSeconds} ${datePartMeridiem} `,
        'YYYY-MM-DD hh:mm:ss A'
      );
    } else {
      if (hhNumber < 0 || hhNumber > 24 || mmNumber > 60) {
        resetField('startDate');
        return { isInvalid: true };
      }

      const datePart = dayjs(task?.startTime)?.format('YYYY-MM-DD');
      const datePartSeconds = dayjs(task?.startTime)?.format('ss');

      dayjsDate = dayjs(`${datePart} ${hh}:${mm}:${datePartSeconds}`, 'YYYY-MM-DD HH:mm:ss');
    }

    return { dayjsDate: dayjsDate, isInvalid: false };
  };

  const onDateInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const openOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOptionsAnchor(event.currentTarget);
  };

  const closeOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOptionsAnchor(null);
  };

  const onDeleteTask = async () => {
    if (task?.groupedTasks && task?.groupedTasks?.length > 1) {
      const taskDeleteRequests = task?.groupedTasks?.map((t) => {
        return deleteTaskReqAsync(t.id?.toString());
      });

      try {
        await Promise.all(taskDeleteRequests);
        queryClient.invalidateQueries('tasks');
        setOptionsAnchor(null);
        showNotification('Tasks deleted successfully!', 'success');
      } catch (error: any) {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        setOptionsAnchor(null);
        showNotification(errorMessage);
      }

      return;
    }

    deleteTaskReq(task.id?.toString(), {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        setOptionsAnchor(null);
        showNotification('Task deleted successfully!', 'success');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        setOptionsAnchor(null);
        showNotification(errorMessage);
      },
    });
  };

  const onStartTimer = async (e: SyntheticEvent) => {
    e.stopPropagation();

    const currentRunningTask = tasks?.find((t) => t?.startTime && !t?.endTime);

    if (currentRunningTask) {
      const { startTime, description } = currentRunningTask || {};

      const requestBody: UpdateTaskReq = {
        description: description,
        startTime: startTime,
        endTime: new Date().toISOString(),
      };

      await updateTaskReqAsync({ reqBody: requestBody, taskId: currentRunningTask?.id?.toString() });
    }

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

  const formattedTaskTime = getFormattedTime(task?.taskTotalTime);

  return (
    <div className={classes.task}>
      {numberOfSubItems ? (
        <Chip className={classes.chipWrapper} label={numberOfSubItems} size="small" />
      ) : null}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={classes.description}
            label="Enter description"
            variant="outlined"
            size="small"
            onClick={onInputChange}
            onBlur={onInputBlur}
            fullWidth
          />
        )}
      />

      <div className={classes.timeRange}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.description}
              onClick={onDateInputChange}
              onBlur={onStartDateBlur}
              disabled={task?.groupedTasks && task?.groupedTasks?.length > 1}
              variant="standard"
            ></TextField>
          )}
        />
        <span className={classes.timeRangeSeparator}>-</span>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.description}
              onClick={onDateInputChange}
              onBlur={onEndDateBlur}
              disabled={task?.groupedTasks && task?.groupedTasks?.length > 1}
              variant="standard"
            ></TextField>
          )}
        />
      </div>
      <p className={classes.totalTime}>{formattedTaskTime}</p>
      <div className={classes.actionBtn}>
        <Tooltip title="Continue tracker for this task" placement="bottom-end">
          <IconButton onClick={onStartTimer}>
            <PlayCircleIcon className={`${classes.icon} ${classes.play}`} />
          </IconButton>
        </Tooltip>
        <IconButton onClick={openOptionsMenu}>
          <EllipsisIcon />
          <Menu open={!!optionsAnchor} anchorEl={optionsAnchor} onClose={closeOptionsMenu} elevation={4}>
            <MenuItem className={classes.optionMenuItem} onClick={onDeleteTask}>
              Delete
            </MenuItem>
          </Menu>
        </IconButton>
      </div>
    </div>
  );
};

export default Task;

interface TaskProps {
  task: GroupedTaskItem & GroupedTask;
  numberOfSubItems?: number;
}
