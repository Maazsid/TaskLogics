import { Grid } from '@mui/material';
import TaskList from './task-list/TaskList';
import TimeTracker from './time-tracker/TimeTracker';
import { useEffect, useState } from 'react';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="page-container-loading">
          <p className={classes.loadingText}>Loading, please wait...</p>
        </div>
      ) : (
        <div className="page-container">
          <Grid container rowSpacing={{ xs: 5 }} columnSpacing={{ xs: 10, lg: 10 }}>
            <Grid item xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
              <TaskList />
            </Grid>
            <Grid item xs={12} lg={4} order={{ xs: 1, lg: 2 }}>
              <TimeTracker />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Dashboard;
