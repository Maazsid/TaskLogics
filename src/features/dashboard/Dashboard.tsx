import { Grid } from '@mui/material';
import React from 'react';
import TaskContainer from './task/TaskContainer';
import TimeTracker from './TimeTracker';

const Dashboard = () => {
  return (
    <div className='page-container'>
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          <TaskContainer />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TimeTracker />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
