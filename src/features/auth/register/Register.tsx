import { Button, TextField } from '@mui/material';
import classes from './Register.module.scss';
import GoogleIcon from '@components/svgs/GoogleIcon';
import FacebookIcon from '@components/svgs/FacebookIcon';

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

      <div className={classes.otherChoicesWrapper}>
        <p>or</p>
      </div>

      <div className={classes.socialBtnWrapper}>
        <Button className={classes.btn} variant="outlined">
          Sign in as guest
        </Button>
        <Button
          className={`${classes.btn} ${classes.socialBtn}`}
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Button
          className={`${classes.btn} ${classes.socialBtn}`}
          variant="outlined"
          startIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>
      </div>

      <p className={classes.footerText}>
        Already have an account? <span className={classes.footerTextHighlight}>Sign in</span>
      </p>
    </>
  );
};

export default Register;
