import { List, ListItem } from '@mui/material';
import React from 'react';
import EmptyListIcon from '../../../shared-components/svgs/EmptyListIcon';
import TaskCard from './TaskCard';
import WeekSeparator from './WeekSeparator';

const TaskList = () => {
  const isTasksAvail = true;

  return (
    <>
      <header className='header'>
        <h2 className='header__title'>Tasks List</h2>
      </header>

      <div className='task-list'>
        {isTasksAvail ? (
          <>
            <List>
              <ListItem className='task-list__item' disablePadding>
                <WeekSeparator />
              </ListItem>

              <ListItem className='task-list__item' disablePadding>
                <TaskCard />
              </ListItem>
            </List>
          </>
        ) : (
          <div className='task-list__empty-wrapper'>
            <EmptyListIcon className='task-list__empty-icon' />
            <h3 className='task-list__empty-header'>No tasks found.</h3>
            <p className='task-list__empty-description'>
              Add a task and it will show up here.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
