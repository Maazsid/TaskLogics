import { List, ListItem } from '@mui/material';
import TaskCard from './task-card/TaskCard';
import WeekSeparator from './week-separator/WeekSeparator';
import EmptyListIcon from '@components/svgs/EmptyListIcon';
import classes from './TaskList.module.scss';
import { useState } from 'react';

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const isTasksAvail = true;

  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.headerTitle}>Tasks List</h2>
      </header>

      <div className={`${classes.taskList} ${isLoading ? classes.loading : ''}`}>
        {isTasksAvail ? (
          <>
            <List>
              <ListItem className={classes.taskListItem} disablePadding>
                <WeekSeparator />
              </ListItem>

              <ListItem className={classes.taskListItem} disablePadding>
                <TaskCard />
              </ListItem>
            </List>
          </>
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
