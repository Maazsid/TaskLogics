import { List, ListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Task from './Task';

const TaskCard = () => {
  return (
    <article className="task-card">
      <header className="task-card__header">
        <h4 className="task-card__header-title">Mon, Jun 24</h4>
        <ul className="task-card__header-list">
          <li className="task-card__header-list-item">00:02:00</li>
        </ul>
      </header>

      <div className="task-card__content">
        <List>
          <ListItem className="task-card__list-item" disablePadding>
            <Accordion className="task-card__accordion">
              <AccordionSummary className="task-card__accordion-summary" expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className="task-card__accordion-detail">
                <Task />
                <span className="task-card__space-24"></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <ListItem className="task-card__list-item" disablePadding>
            <Accordion className="task-card__accordion">
              <AccordionSummary className="task-card__accordion-summary" expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className="task-card__accordion-detail">
                <Task />
                <span className="task-card__space-24"></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <ListItem className="task-card__list-item" disablePadding>
            <Accordion className="task-card__accordion">
              <AccordionSummary className="task-card__accordion-summary" expandIcon={<ExpandMoreIcon />}>
                <Task />
              </AccordionSummary>
              <AccordionDetails className="task-card__accordion-detail">
                <Task />
                <span className="task-card__space-24"></span>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>
      </div>
    </article>
  );
};

export default TaskCard;
