import { Card, CardContent, IconButton, MenuItem, Menu, TextField } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useState, MouseEvent } from 'react';
import EllipsisIcon from '@components/svgs/EllipsisIcon';

const TimeTracker = () => {
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const openOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    setOptionsAnchor(event.currentTarget);
  };

  const closeOptionsMenu = () => {
    setOptionsAnchor(null);
  };

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Card className="tracker">
        <CardContent>
          <header className="tracker__header">
            <h2 className="tracker__header-title">Time Tracker</h2>
            <div className="tracker__header-options">
              <IconButton onClick={openOptionsMenu}>
                <EllipsisIcon />
              </IconButton>
            </div>
          </header>

          <Menu open={!!optionsAnchor} anchorEl={optionsAnchor} onClose={closeOptionsMenu} elevation={4}>
            <MenuItem className="tracker__option-menu-item" onClick={closeOptionsMenu}>
              Discard
            </MenuItem>
          </Menu>

          <TextField
            multiline
            maxRows={4}
            fullWidth
            size="small"
            label="Enter description"
            variant="outlined"
          ></TextField>
          <h3 className="tracker__timer-text">00:00:00</h3>

          <div className="tracker__action-btn-wrapper">
            {isPlaying ? (
              <IconButton onClick={toggleIsPlaying}>
                <StopCircleIcon className="tracker__icon tracker__icon--stop" />
              </IconButton>
            ) : (
              <IconButton onClick={toggleIsPlaying}>
                <PlayCircleIcon className="tracker__icon tracker__icon--play" />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeTracker;
