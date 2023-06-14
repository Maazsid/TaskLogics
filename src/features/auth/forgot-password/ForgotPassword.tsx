import { Button, TextField } from '@mui/material';
import classes from './ForgotPassword.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
      <Link className={classes.backBtnLink} to="/login">
        <Button className={classes.backBtn} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
      </Link>

      <div className="headerTitle text-bold-1">Change Password</div>

      <TextField
        className={classes.formField}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
        label="Email"
        variant="filled"
        placeholder="Enter email"
      />

      <Button className={classes.signUpBtn} variant="outlined" fullWidth>
        Submit
      </Button>
    </>
  );
};

export default ForgotPassword;
