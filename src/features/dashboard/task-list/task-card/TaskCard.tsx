import {
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Badge,
  Chip,
} from '@mui/material';
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
            <Accordion className={classes.accordion} disableGutters={true}>
              <AccordionSummary
                className={classes.accordionSummary}
                expandIcon={false && <ExpandIconButton />}
              >
                <Task numberOfSubItems={0} />
                <span className={classes.emptyIconSpace}></span>
              </AccordionSummary>
            </Accordion>
          </ListItem>

          <ListItem className={classes.taskListItem} disablePadding>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandIconButton />}>
                <Task numberOfSubItems={1} />
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <List className = {classes.subTaskListWrapper}>
                  <ListItem className = {classes.subTaskListItem} disablePadding>
                    <Task />
                    <span className={classes.emptyIconSpace}></span>
                  </ListItem>
                  <ListItem className = {classes.subTaskListItem} disablePadding>
                    <Task />
                    <span className={classes.emptyIconSpace}></span>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      </div>
    </article>
  );
};

export default TaskCard;

const ExpandIconButton = () => {
  return (
    <IconButton>
      <ExpandMoreIcon />
    </IconButton>
  );
};
