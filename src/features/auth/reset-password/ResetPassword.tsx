import { Button, TextField, IconButton, CircularProgress } from '@mui/material';
import classes from './ResetPassword.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ResetPasswordSchema, resetPasswordSchema } from '../Validators/ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import PasswordStrengthList from '../password-strength-list/PasswordStrengthList';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { resetPassword } from 'api/api';
import { ResetPasswordReq } from 'api/models/reset-password/reset-password-req.model';
import withSnackbar, { ShowNotification } from '@components/withSnackbar';

const ResetPasswordComponent = ({ showNotification }: ResetPasswordProps) => {
  const { state: routerState }: ResetPasswordLocationState = useLocation();

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(resetPassword);

  const [{ showPassword, showConfirmPassword }, setShowPassword] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors: fieldErrors },
    getFieldState,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (formData) => {
    const { password } = formData || {};

    const requestBody: ResetPasswordReq = {
      password: password?.trim(),
    };

    const mutationParams = {
      requestBody: requestBody,
      resetPasswordToken: routerState?.resetPasswordToken,
    };

    mutate(mutationParams, {
      onSuccess: () => {
        showNotification('Password reset successfully!', 'success');
        navigate('/login', { replace: true });
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const isPasswordFieldDirty = getFieldState('password')?.isDirty;

  if (!routerState?.resetPasswordToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="headerTitle text-bold-1">Reset Password</div>

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            className={classes.formField}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label="Password"
            variant="filled"
            placeholder="Enter password"
            error={fieldErrors?.password ? true : false}
            helperText={fieldErrors?.password ? fieldErrors?.password?.message : false}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() =>
                    setShowPassword((prevValue) => ({ ...prevValue, showPassword: !showPassword }))
                  }
                >
                  {showPassword ? (
                    <VisibilityOff className={classes.visibilityIcon} />
                  ) : (
                    <Visibility className={classes.visibilityIcon} />
                  )}
                </IconButton>
              ),
            }}
            {...field}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            className={classes.formField}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label="Confirm Password"
            variant="filled"
            placeholder="Enter confirm password"
            error={fieldErrors?.confirmPassword ? true : false}
            helperText={fieldErrors?.confirmPassword ? fieldErrors?.confirmPassword?.message : false}
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() =>
                    setShowPassword((prevValue) => ({
                      ...prevValue,
                      showConfirmPassword: !showConfirmPassword,
                    }))
                  }
                >
                  {showConfirmPassword ? (
                    <VisibilityOff className={classes.visibilityIcon} />
                  ) : (
                    <Visibility className={classes.visibilityIcon} />
                  )}
                </IconButton>
              ),
            }}
            {...field}
          />
        )}
      />

      <PasswordStrengthList isPasswordFieldDirty={isPasswordFieldDirty} fieldErrors={fieldErrors} />

      <Button
        className={classes.signUpBtn}
        variant="outlined"
        fullWidth
        type="submit"
        endIcon={isLoading && <CircularProgress className={classes.signUpBtnSpinner} size={20} />}
        disabled={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

const ResetPassword = withSnackbar(ResetPasswordComponent);

export default ResetPassword;

interface ResetPasswordLocationState {
  state: {
    resetPasswordToken: string;
  };
}

interface ResetPasswordProps {
  showNotification: ShowNotification;
}
