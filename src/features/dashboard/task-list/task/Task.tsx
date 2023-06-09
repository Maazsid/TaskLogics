import { TextField, IconButton } from '@mui/material';
import { SyntheticEvent } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EllipsisIcon from '@components/svgs/EllipsisIcon';
import classes from './Task.module.scss';

const Task = () => {
  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.task}>
      <TextField
        className={classes.description}
        label="Enter your description"
        variant="outlined"
        size="small"
        onClick={onInputChange}
        fullWidth
      />
      <div className={classes.timeRange}>
        <TextField className={classes.description} variant="standard"></TextField>
        <span className={classes.timeRangeSeparator}>-</span>
        <TextField className={classes.description} variant="standard"></TextField>
      </div>
      <p className={classes.totalTime}>00:22:00</p>
      <div className={classes.actionBtn}>
        <IconButton>
          <PlayCircleIcon className={`${classes.icon} ${classes.play}`} />
        </IconButton>
        {/* <IconButton>
          <StopCircleIcon className={`${classes.icon} ${classes.stop}`} />
        </IconButton> */}
        <IconButton>
          <EllipsisIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
