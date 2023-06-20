import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import classes from './VerifyOtp.module.scss';
import AuthCode from 'react-auth-code-input';
import { useState } from 'react';

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOnChange = (res: string) => {
    setOtp(res);
  };

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <Link className={classes.backBtnLink} to="/forgot-password">
        <Button className={classes.backBtn} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
      </Link>

      <div className="headerTitle text-bold-1">OTP Verification</div>

      <p className={classes.otpText}>Enter OTP sent to your email at maaz.d.is@gmail.com</p>

      <AuthCode
        onChange={handleOnChange}
        length={5}
        containerClassName={classes.formField}
        inputClassName={classes.otpInputStyle}
      />

      {isSubmitted && !(otp?.length === 5) && <p className={classes.otpErrorMsg}>OTP is required.</p>}

      <Button className={classes.signUpBtn} variant="outlined" fullWidth onClick={onSubmit}>
        Verify OTP
      </Button>
      <p className={`${classes.otpText} ${classes.alignEnd}`}>
        Din't receive the OTP? <span className={classes.otpTextHighlight}>Resend OTP</span>
      </p>
    </>
  );
};

export default VerifyOtp;
