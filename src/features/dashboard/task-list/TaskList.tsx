import { CircularProgress, List, ListItem } from '@mui/material';
import TaskCard from './task-card/TaskCard';
import WeekSeparator from './week-separator/WeekSeparator';
import EmptyListIcon from '@components/svgs/EmptyListIcon';
import classes from './TaskList.module.scss';
import { useQuery } from 'react-query';
import { getTasks } from 'api/tasks/tasks-api';
import { TaskListI } from '../models/task-list.model';
import { useGroupTaskList } from '../hooks/useGroupTaskList';

const TaskList = () => {
  const { data: tasks, isLoading } = useQuery('tasks', getTasks);
  const taskList: TaskListI = useGroupTaskList(tasks);

  const areTasksAvailable = taskList?.length;

  return (
    <>
      <header className={classes.header}>
        <h2 className="headerTitle">Tasks List</h2>
      </header>
      <div className={`${classes.taskList} ${isLoading ? classes.loading : ''}`}>
        {isLoading ? (
          <CircularProgress size={70} disableShrink />
        ) : areTasksAvailable ? (
          <List>
            {taskList.map((task) => {
              return (
                <div key={task?.weekName}>
                  <ListItem className={classes.taskListItem} disablePadding>
                    <WeekSeparator task={task} />
                  </ListItem>
                  {task?.days?.map((taskWeekDay) => {
                    return (
                      <ListItem className={classes.taskListItem} disablePadding key={taskWeekDay?.dayName}>
                        <TaskCard taskWeekDay={taskWeekDay} />
                      </ListItem>
                    );
                  })}
                </div>
              );
            })}
          </List>
        ) : (
          <div className={classes.emptyListWrapper}>
            <EmptyListIcon className={classes.emptyListIcon} />
            <h3 className={classes.emptyListHeader}>No tasks found.</h3>
            <p className={classes.emptyListDescription}>Add a task and it will show up here.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
