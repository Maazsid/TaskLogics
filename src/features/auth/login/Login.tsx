import FacebookIcon from '@components/svgs/FacebookIcon';
import GoogleIcon from '@components/svgs/GoogleIcon';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './Login.module.scss';

const Login = () => {
  return (
    <>
      <div className="headerTitle text-bold-1">Sign in</div>

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

      <Link to="/forgot-password">
        <p className={classes.forgotPasswordText}>Forgot password?</p>
      </Link>

      <Button className={classes.signUpBtn} variant="outlined" fullWidth>
        Sign in
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
        Don't have an account?{' '}
        <Link className={classes.footerTextHighlight} to="/register">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
