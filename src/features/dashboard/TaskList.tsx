import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ListItem,
  List,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  TextField,
  IconButton,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';
import EmptyListIcon from '../../shared-components/svgs/EmptyListIcon';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import EllipsisIcon from '../../shared-components/svgs/EllipsisIcon';

const TaskList = () => {
  const isTasksAvail = true;

  const onInputChange = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <header className='header'>
        <h2 className='header__title'>Tasks List</h2>
      </header>
      <div className='task'>
        {isTasksAvail ? (
          <>
            <List>
              <ListItem className='task__list-item' disablePadding>
                <div className='task__week-separator'>
                  <span className='task__separator-line'></span>
                  <p className='task__week-separator-text'>
                    This week:{' '}
                    <span className='task__week-separator-text--bold'>
                      34:33
                    </span>
                  </p>
                  <span className='task__separator-line'></span>
                </div>
              </ListItem>

              <ListItem className='task__list-item' disablePadding>
                <article className='task__card'>
                  <header className='task__card-header'>
                    <h4 className='task__card-header-title'>Mon, Jun 24</h4>
                    <ul className='task__card-header-list'>
                      <li className='task__card-header-list-item'>00:02:00</li>
                    </ul>
                  </header>

                  <div className='task__card-content'>
                    <List>
                      <ListItem className='task__card-list-item' disablePadding>
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
                            <p className='task__accordion-total-time'>
                              00:22:00
                            </p>
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
                        </Accordion>
                      </ListItem>
                    </List>
                  </div>
                </article>
              </ListItem>

              <ListItem className='task__list-item' disablePadding>
                <div className='task__week-separator'>
                  <span className='task__separator-line'></span>
                  <p className='task__week-separator-text'>
                    This week:{' '}
                    <span className='task__week-separator-text--bold'>
                      34:33
                    </span>
                  </p>
                  <span className='task__separator-line'></span>
                </div>
              </ListItem>
            </List>
          </>
        ) : (
          <div className='task__empty-list-wrapper'>
            <EmptyListIcon className='task__empty-list-icon' />
            <h3 className='task__empty-list-header'>No tasks found.</h3>
            <p className='task__empty-list-text'>
              Add a task and it will show up here.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
