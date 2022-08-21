import { TextField, IconButton } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import EllipsisIcon from '../../../shared-components/svgs/EllipsisIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const Task = () => {
  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className='task'>
      <TextField
        className='task__input'
        label='Enter your description'
        variant='outlined'
        size='small'
        onClick={onInputChange}
        fullWidth
      />
      <div className='task__time-range'>
        <TextField className='task__input' variant='standard'></TextField>
        <span className='task__time-range-separator'>-</span>
        <TextField className='task__input' variant='standard'></TextField>
      </div>
      <p className='task__total-time'>00:22:00</p>
      <div className='task__action-btn'>
        <IconButton>
          <PlayCircleIcon className='task__icon task__icon--play' />
        </IconButton>
        {/* <IconButton>
          <StopCircleIcon className='task__icon task__icon--stop' />
        </IconButton> */}
        <IconButton>
          <EllipsisIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
