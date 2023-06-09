import { List, ListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Task from '../task/Task';
import classes from './TaskCard.module.scss';

const TaskCard = () => {
  return (
    <article className={classes.taskCard}>
      <header className={classes.header}>
        <h4 className={classes.headerTitle}>Mon, Jun 24</h4>
        <ul className={classes.headerList}>
          <li className={classes.headerListItem}>00:02:00</li>
        </ul>
      </header>

      <div className={classes.listWrapper}>
        <List>
          <ListItem className={classes.taskListItem} disablePadding>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <Task />
                <span className={classes.emptyIconSpace}></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <ListItem className={classes.taskListItem} disablePadding>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <Task />
                <span className={classes.emptyIconSpace}></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <ListItem className={classes.taskListItem} disablePadding>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <Task />
                <span className={classes.emptyIconSpace}></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      </div>
    </article>
  );
};

export default TaskCard;
