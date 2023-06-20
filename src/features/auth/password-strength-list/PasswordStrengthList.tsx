import { FieldErrors } from 'react-hook-form';
import { checkPasswordList } from '../Validators/RegistrationSchema';
import classes from './PasswordStrengthList.module.scss';
import { List, ListItem } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const PasswordStrengthList = ({ isPasswordFieldDirty, fieldErrors }: PasswordStrengthProps) => {
  return (
    <List className={classes.passwordTextList}>
      {checkPasswordList?.map((p) => {
        return (
          <ListItem className={classes.passwordTextListItem} key={p.key}>
            <div className={classes.passwordTextWrapper}>
              <TaskAltIcon
                className={`${classes.passwordTextIcon} ${
                  isPasswordFieldDirty && !fieldErrors?.password?.type?.includes(p?.key) ? classes.valid : ''
                }`}
              />
              <p className={classes.passwordText}>{p?.message}</p>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PasswordStrengthList;

interface PasswordStrengthProps {
  isPasswordFieldDirty: boolean;
  fieldErrors: FieldErrors<{
    password: string;
  }>;
}
