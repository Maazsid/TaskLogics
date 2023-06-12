import { Button, TextField } from '@mui/material';
import classes from './Register.module.scss';

const Register = () => {
  return (
    <>
      <div className="headerTitle text-bold-1">Create your account</div>

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="First name"
        variant="filled"
        placeholder="Enter first name"
      />

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="Last name"
        variant="filled"
        placeholder="Enter last name"
      />

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="Email"
        variant="filled"
        placeholder="Enter email"
      />

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
        Sign up
      </Button>
    </>
  );
};

export default Register;
