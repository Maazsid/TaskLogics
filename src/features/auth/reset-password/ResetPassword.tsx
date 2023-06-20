import { Button, TextField, IconButton } from '@mui/material';
import classes from './ResetPassword.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ResetPasswordSchema, resetPasswordSchema } from '../Validators/ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import PasswordStrengthList from '../password-strength-list/PasswordStrengthList';

const ResetPassword = () => {
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

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    return;
  };

  const isPasswordFieldDirty = getFieldState('password')?.isDirty;

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

      <Button className={classes.signUpBtn} variant="outlined" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ResetPassword;
