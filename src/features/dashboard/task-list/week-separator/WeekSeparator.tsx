import classes from './WeekSeparator.module.scss';

const WeekSeparator = () => {
  return (
    <div className={classes.weekSeparator}>
      <span className={classes.weekSeparatorLine}></span>
      <p className={classes.weekSeparatorText}>
        This week: <span className={`${classes.weekSeparatorText} ${classes.bold}`}>00:34:33</span>
      </p>
      <span className={classes.weekSeparatorLine}></span>
    </div>
  );
};

export default WeekSeparator;
