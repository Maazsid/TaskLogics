import classes from './WeekSeparator.module.scss';
import { TaskListItem } from '@features/dashboard/models/task-list.model';
import { getFormattedTime } from 'utils/utils';

const WeekSeparator = ({ task }: WeekSeparatorProps) => {
  const weekTotalTime = task?.weekTotalTime;

  const formattedWeekTotalTime = getFormattedTime(weekTotalTime);

  return (
    <div className={classes.weekSeparator}>
      <span className={classes.weekSeparatorLine}></span>
      <p className={classes.weekSeparatorText}>
        {task?.weekName}:{' '}
        <span className={`${classes.weekSeparatorText} ${classes.bold}`}>{formattedWeekTotalTime}</span>
      </p>
      <span className={classes.weekSeparatorLine}></span>
    </div>
  );
};

export default WeekSeparator;

interface WeekSeparatorProps {
  task: TaskListItem;
}
