import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import classes from './Register.module.scss';
import GoogleIcon from '@components/svgs/GoogleIcon';
import FacebookIcon from '@components/svgs/FacebookIcon';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationForm, registrationSchema } from '../Validators/RegistrationSchema';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import PasswordStrengthList from '../password-strength-list/PasswordStrengthList';
import { useMutation } from 'react-query';
import { registerUser } from 'api/auth/auth-api';
import { RegisterReq } from 'api/auth/models/register/register-req.model';
import { useNotificationStore } from 'store/store';

const Register = () => {
  const [{ showPassword, showConfirmPassword }, setShowPassword] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const showNotification = useNotificationStore((state) => state.showNotification);

  const { isLoading, mutate } = useMutation(registerUser);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors: fieldErrors },
    getFieldState,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationForm> = (formData) => {
    const { firstName, lastName, email, password } = formData || {};

    const requestBody: RegisterReq = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim(),
      password: password?.trim(),
    };

    mutate(requestBody, {
      onSuccess: (res) => {
        navigate('/verify-otp', {
          state: {
            otpToken: res?.otpToken,
            email: email?.trim(),
          },
        });
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.messages?.[0] || 'Something went wrong.';
        showNotification(errorMessage);
      },
    });
  };

  const onSignInWithGoogle = () => {
    window.open('http://localhost:3000/api/auth/google', '_self');
  };

  const isPasswordFieldDirty = getFieldState('password')?.isDirty;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="headerTitle text-bold-1">Create your account</div>

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.formField}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="First name"
              variant="filled"
              placeholder="Enter first name"
              error={fieldErrors?.firstName ? true : false}
              helperText={fieldErrors?.firstName ? fieldErrors?.firstName?.message : false}
              {...field}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.formField}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Last name"
              variant="filled"
              placeholder="Enter last name"
              error={fieldErrors?.lastName ? true : false}
              helperText={fieldErrors?.lastName ? fieldErrors?.lastName?.message : false}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.formField}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Email"
              variant="filled"
              placeholder="Enter email"
              error={fieldErrors?.email ? true : false}
              helperText={fieldErrors?.email ? fieldErrors?.email?.message : false}
              {...field}
            />
          )}
        />

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
          type="submit"
          fullWidth
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress className={classes.signUpBtnSpinner} size={20} />}
        >
          Sign up
        </Button>
      </form>
      <div className={classes.otherChoicesWrapper}>
        <p>or</p>
      </div>

      <div className={classes.socialBtnWrapper}>
        <Button className={classes.btn} variant="outlined" disabled={isLoading}>
          Sign in as guest
        </Button>
        <Button
          className={`${classes.btn} ${classes.socialBtn}`}
          variant="outlined"
          startIcon={<GoogleIcon />}
          disabled={isLoading}
          onClick={onSignInWithGoogle}
        >
          Sign in with Google
        </Button>
        <Button
          className={`${classes.btn} ${classes.socialBtn}`}
          variant="outlined"
          startIcon={<FacebookIcon />}
          disabled={isLoading}
        >
          Sign in with Facebook
        </Button>
      </div>

      <p className={classes.footerText}>
        Already have an account?{' '}
        <Link className={classes.footerTextHighlight} to="/login">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default Register;
