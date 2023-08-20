import { Card, CardContent, IconButton, MenuItem, Menu, TextField } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useState, MouseEvent } from 'react';
import EllipsisIcon from '@components/svgs/EllipsisIcon';
import classes from './TimeTracker.module.scss';

const TimeTracker = () => {
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    setOptionsAnchor(event.currentTarget);
  };

  const closeOptionsMenu = () => {
    setOptionsAnchor(null);
  };

  const toggleIsPlaying = () => {
    if(!isPlaying) {
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Card className={`${classes.trackerCard} ${isLoading ? classes.loading : ''}`}>
        <CardContent>
          <header className={classes.header}>
            <h2 className={classes.headerTitle}>Time Tracker</h2>
            <div className={classes.headerOptions}>
              <IconButton onClick={openOptionsMenu}>
                <EllipsisIcon />
              </IconButton>
              <Menu open={!!optionsAnchor} anchorEl={optionsAnchor} onClose={closeOptionsMenu} elevation={4}>
                <MenuItem className={classes.optionMenuItem} onClick={closeOptionsMenu}>
                  Discard
                </MenuItem>
              </Menu>
            </div>
          </header>

          <TextField
            multiline
            maxRows={4}
            fullWidth
            size="small"
            label="Enter description"
            variant="outlined"
          ></TextField>

          <h3 className={classes.timerText}>00:00:00</h3>

          <div className={classes.actionBtnWrapper}>
            {isPlaying ? (
              <IconButton onClick={toggleIsPlaying}>
                <StopCircleIcon className={`${classes.icon} ${classes.stop}`} />
              </IconButton>
            ) : (
              <IconButton onClick={toggleIsPlaying}>
                <PlayCircleIcon className={`${classes.icon} ${classes.play}`} />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeTracker;
