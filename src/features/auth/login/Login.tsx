import FacebookIcon from '@components/svgs/FacebookIcon';
import GoogleIcon from '@components/svgs/GoogleIcon';
import { TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm, loginSchema } from '../Validators/LoginSchema';
import { useMutation } from 'react-query';
import { loginUser } from 'api/api';
import { LoginReq } from 'api/models/login/login-req';
import { NotificationContext } from 'context/NotificationContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, mutate } = useMutation(loginUser);
  const { showNotification } = useContext(NotificationContext) as NotificationContextType;

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (formData) => {
    const { email, password } = formData || {};

    const requestBody: LoginReq = {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="headerTitle text-bold-1">Sign in</div>

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
                <IconButton onClick={() => setShowPassword(!showPassword)}>
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

      <Link to="/forgot-password">
        <p className={classes.forgotPasswordText}>Forgot password?</p>
      </Link>

      <Button
        className={classes.signUpBtn}
        variant="outlined"
        fullWidth
        type="submit"
        disabled={isLoading}
        endIcon={isLoading && <CircularProgress className={classes.signUpBtnSpinner} size={20} />}
      >
        Sign in
      </Button>

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
        Don't have an account?{' '}
        <Link className={classes.footerTextHighlight} to="/register">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
