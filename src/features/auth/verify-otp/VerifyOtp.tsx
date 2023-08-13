import { Button, CircularProgress } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import classes from './VerifyOtp.module.scss';
import AuthCode from 'react-auth-code-input';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { resendOtp, verifyOtpCode } from 'api/api';
import { VerifyOtpReq } from 'api/models/verify-otp/verify-otp-req.model';
import { VerificationTypeEnum } from 'enums/verification-type.enum';
import useCountdownTimer from 'hooks/useCountdownTimer';
import { useNotificationStore } from 'store/store';

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { countdownTimer, isCountdownTimerOn, setIsCountdownTimerOn } = useCountdownTimer(60);
  const showNotification = useNotificationStore((state) => state.showNotification);

  const { state: routerState }: VerifyOtpLocationState = useLocation();
  const navigate = useNavigate();

  const { isLoading: isVerifyOtpLoading, mutate: verifyOtpCodeReq } = useMutation(verifyOtpCode);
  const { isLoading: isResendOtpLoading, mutate: resendOtpReq } = useMutation(resendOtp);

  const isLoading = isVerifyOtpLoading || isResendOtpLoading;

  const onSubmit = () => {
    setIsSubmitted(true);

    if (otp?.length < 6) return;

    const requestBody: VerifyOtpReq = {
      otp: otp,
      verificationType: routerState?.isForgotPassword
        ? VerificationTypeEnum.ForgotPassword
        : VerificationTypeEnum.Login,
    };

    const mutationParms = {
      requestBody,
      otpToken: routerState?.otpToken,
    };

    verifyOtpCodeReq(mutationParms, {
      onSuccess: (res) => {
        if (routerState?.isForgotPassword) {
          navigate('/reset-password', {
            replace: true,
            state: {
              resetPasswordToken: res?.resetPasswordToken,
            },
          });
          return;
        }

        navigate('/dashboard', { replace: true });
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const onResendOtp = () => {
    setIsCountdownTimerOn(true);

    resendOtpReq(routerState?.otpToken, {
      onSuccess: () => {
        showNotification('OTP resent successfully!', 'success');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const handleOnChange = (res: string) => {
    setOtp(res);
  };

  if (!routerState?.otpToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="headerTitle text-bold-1">OTP Verification</div>

      <p className={classes.otpText}>Enter OTP sent to your email at {routerState?.email}</p>

      <AuthCode
        onChange={handleOnChange}
        length={6}
        containerClassName={classes.formField}
        inputClassName={classes.otpInputStyle}
      />

      {isSubmitted && !(otp?.length === 6) && <p className={classes.otpErrorMsg}>OTP is required.</p>}

      <Button
        className={classes.signUpBtn}
        variant="outlined"
        fullWidth
        endIcon={isLoading && <CircularProgress className={classes.signUpBtnSpinner} size={20} />}
        disabled={isLoading}
        onClick={onSubmit}
      >
        Verify OTP
      </Button>
      <p className={`${classes.otpText} ${classes.alignEnd}`}>
        Din't receive the OTP?{' '}
        {isCountdownTimerOn ? (
          <span className={classes.resendTimerText}>Resend OTP in {countdownTimer}</span>
        ) : (
          <button className={classes.otpTextHighlight} disabled={isLoading} onClick={onResendOtp}>
            Resend OTP
          </button>
        )}
      </p>
    </>
  );
};

export default VerifyOtp;

interface VerifyOtpLocationState {
  state: {
    otpToken: string;
    email: string;
    isForgotPassword?: boolean;
  };
}
