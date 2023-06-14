import { Grid, useMediaQuery } from '@mui/material';
import Navbar from '../navbar/Navbar';
import classes from './AuthLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import TaskManagementIcon from '@components/svgs/TaskManagementIcon';

const AuthLayout = () => {
  const isMobileScreen = useMediaQuery('(max-width : 1280px)');
  const location = useLocation();

  return (
    <>
      <Navbar hideLinks={true} />

      <Grid className={classes.gridContainer} container>
        {!isMobileScreen && (
          <Grid className={classes.heroSectionGrid} item xs={6}>
            <div className={classes.heroSectionContainer}>
              <TaskManagementIcon className={classes.heroIcon} />
              <header className={classes.heroSectionHeader}>
                <h1 className={classes.heroSectionHeaderTitle}>The simplest way to manage your time</h1>
                <p className={classes.heroSectionDescription}>
                  Task logics is a free time tracking application. It's a simple tracker to let you track your
                  work and hours on a task.
                </p>
              </header>
            </div>
          </Grid>
        )}

        {isMobileScreen && <Grid item xs={0} sm={2}></Grid>}

        <Grid item xs={12} sm={isMobileScreen ? 8 : 6}>
          <div
            className={
              location.pathname === '/login' || location.pathname === '/register'
                ? classes.formContainer
                : classes.formContainerCenter
            }
          >
            <Outlet />
          </div>
        </Grid>
        {isMobileScreen && <Grid item xs={0} sm={2}></Grid>}
      </Grid>
    </>
  );
};

export default AuthLayout;
