import { IconButton, Link } from '@mui/material';
import classes from './AboutUs.module.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const AboutUs = () => {
  return (
    <div className="page-container-2">
      <h2 className="headerTitle">What is Task Logics?</h2>
      <p className={classes.mt4}>
        Task logics is a task management application, which allows you to list the task you need to do and
        also track it at the same time.
      </p>
      <div className={classes.contactUsWrapper}>
        <h2 className={`headerTitle ${classes.mt4}`}>Contact Us</h2>
        <p className={classes.mt4}>Made by Maaz Siddiqui</p>
        <div className={classes.iconListWrapper}>
          <Link href="https://www.linkedin.com/in/maaz-siddiqui-4206b7183/" target="_blank" rel="noopener">
            <IconButton>
              <LinkedInIcon className={`${classes.icon} ${classes.linkedIn}`} />
            </IconButton>
          </Link>
          <Link href="mailto:maaz.d.sid@gmail.com" target="_blank" rel="noopener">
            <IconButton>
              <EmailIcon className={`${classes.icon} ${classes.gmail}`} />
            </IconButton>
          </Link>

          <Link href="https://github.com/Maazsid" target="_blank" rel="noopener">
            <IconButton>
              <GitHubIcon className={`${classes.icon} ${classes.github}`} />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { AboutUs };
