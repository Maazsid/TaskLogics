import { TextField, IconButton, Menu, MenuItem, Chip, Tooltip } from '@mui/material';
import { SyntheticEvent, useState, MouseEvent } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EllipsisIcon from '@components/svgs/EllipsisIcon';
import classes from './Task.module.scss';

const Task = ({ numberOfSubItems }: TaskProps) => {
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);

  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const onDateInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const openOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOptionsAnchor(event.currentTarget);
  };

  const closeOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOptionsAnchor(null);
  };

  const onClickPlayBtn = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.task}>
      {numberOfSubItems ? (
        <Chip className={classes.chipWrapper} label={numberOfSubItems} size="small" />
      ) : null}

      <TextField
        className={classes.description}
        label="Enter your description"
        variant="outlined"
        size="small"
        onClick={onInputChange}
        fullWidth
      />
      <div className={classes.timeRange}>
        <TextField className={classes.description} onClick={onDateInputChange} variant="standard"></TextField>
        <span className={classes.timeRangeSeparator}>-</span>
        <TextField className={classes.description} onClick={onDateInputChange} variant="standard"></TextField>
      </div>
      <p className={classes.totalTime}>00:22:00</p>
      <div className={classes.actionBtn}>
        <Tooltip title="Continue tracker for this task" placement="bottom-end">
          <IconButton onClick={onClickPlayBtn}>
            <PlayCircleIcon className={`${classes.icon} ${classes.play}`} />
          </IconButton>
        </Tooltip>
        <IconButton onClick={openOptionsMenu}>
          <EllipsisIcon />
          <Menu open={!!optionsAnchor} anchorEl={optionsAnchor} onClose={closeOptionsMenu} elevation={4}>
            <MenuItem className={classes.optionMenuItem} onClick={closeOptionsMenu}>
              Delete
            </MenuItem>
          </Menu>
        </IconButton>
      </div>
    </div>
  );
};

export default Task;

interface TaskProps {
  numberOfSubItems?: number;
}
