import {
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  TextField,
  IconButton,
  AccordionDetails,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';
import EllipsisIcon from '../../../shared-components/svgs/EllipsisIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import TimeEntry from './TimeEntry';

const Task = () => {
  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <article className='task'>
      <header className='task__header'>
        <h4 className='task__header-title'>Mon, Jun 24</h4>
        <ul className='task__header-list'>
          <li className='task__header-list-item'>00:02:00</li>
        </ul>
      </header>

      <div className='task__content'>
        <List>
          <ListItem className='task__list-item' disablePadding>
            <Accordion className='task__accordion'>
              <AccordionSummary
                className='task__accordion-summary'
                expandIcon={<ExpandMoreIcon />}
              >
                <TextField
                  label='Enter your description'
                  variant='outlined'
                  size='small'
                  onClick={onInputChange}
                  fullWidth
                />
                <p className='task__accordion-total-time'>00:22:00</p>
                <div className='task__accordion-action-btn'>
                  <IconButton>
                    <PlayCircleIcon className='task__accordion-icon task__accordion-icon--play' />
                  </IconButton>
                  {/* <IconButton>
              <StopCircleIcon className='task__accordion-icon task__accordion-icon--stop' />
            </IconButton> */}
                  <IconButton>
                    <EllipsisIcon />
                  </IconButton>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <TimeEntry />
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      </div>
    </article>
  );
};

export default Task;
