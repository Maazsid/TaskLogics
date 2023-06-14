import { Button, TextField } from '@mui/material';
import classes from './ResetPassword.module.scss';

const ResetPassword = () => {
  return (
    <>
      <div className="headerTitle text-bold-1">Reset Password</div>

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="Password"
        variant="filled"
        placeholder="Enter password"
      />

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="Confirm Password"
        variant="filled"
        placeholder="Enter confirm password"
      />

      <Button className={classes.signUpBtn} variant="outlined" fullWidth>
        Submit
      </Button>
    </>
  );
};

export default ResetPassword;
