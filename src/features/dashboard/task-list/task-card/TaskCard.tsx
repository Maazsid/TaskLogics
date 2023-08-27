import { List, ListItem, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Task from '../task/Task';
import classes from './TaskCard.module.scss';
import { TaskWeekDay } from '@features/dashboard/models/task-list.model';
import { getFormattedTime } from 'utils/utils';

const TaskCard = ({ taskWeekDay }: TaskCardProps) => {
  const dayName = taskWeekDay?.dayName;
  const formattedDayTotalTime = getFormattedTime(taskWeekDay?.dayTotalTime);

  return (
    <article className={classes.taskCard}>
      <header className={classes.header}>
        <h4 className={classes.headerTitle}>{dayName}</h4>
        <ul className={classes.headerList}>
          <li className={classes.headerListItem}>{formattedDayTotalTime}</li>
        </ul>
      </header>

      <div className={classes.listWrapper}>
        <List>
          {taskWeekDay?.tasks?.map((groupedTask, index) => {
            return groupedTask?.groupedTasks?.length === 1 ? (
              <ListItem
                className={classes.taskListItem}
                disablePadding
                key={groupedTask?.groupedTasks?.[0]?.id}
              >
                <Accordion className={classes.accordion} disableGutters={true}>
                  <AccordionSummary
                    className={classes.accordionSummary}
                    expandIcon={false && <ExpandIconButton />}
                  >
                    <Task task={groupedTask?.groupedTasks?.[0]} numberOfSubItems={0} />
                    <span className={classes.emptyIconSpace}></span>
                  </AccordionSummary>
                </Accordion>
              </ListItem>
            ) : (
              <ListItem
                className={classes.taskListItem}
                disablePadding
                key={groupedTask?.groupedTasks?.[0]?.id}
              >
                <Accordion className={classes.accordion}>
                  <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandIconButton />}>
                    <Task task={groupedTask} numberOfSubItems={groupedTask?.groupedTasks?.length} />
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetail}>
                    <List className={classes.subTaskListWrapper}>
                      {groupedTask?.groupedTasks?.map((t) => {
                        return (
                          <ListItem className={classes.subTaskListItem} disablePadding key={t?.id}>
                            <Task task={t} />
                            <span className={classes.emptyIconSpace}></span>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );
          })}
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

interface TaskCardProps {
  taskWeekDay: TaskWeekDay;
}
