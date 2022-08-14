import { Grid } from '@mui/material';
import React from 'react';
import TaskList from './TaskList';
import TimeTracker from './TimeTracker';

const Dashboard = () => {
  return (
    <div className='page-container'>
      <Grid container spacing={10}>
        <Grid item xs={12} lg = {8}>
          <TaskList />
        </Grid>
        <Grid item xs={12} lg = {4}>
          <TimeTracker />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
