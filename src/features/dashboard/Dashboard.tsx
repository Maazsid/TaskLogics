import { Grid } from '@mui/material';
import TaskList from './task-list/TaskList';
import TimeTracker from './time-tracker/TimeTracker';

const Dashboard = () => {
  return (
    <div className="page-container">
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          <TaskList />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TimeTracker />
        </Grid>
      </Grid>
    </div>
  );
};

export { Dashboard };
