import { Button, CircularProgress, TextField } from '@mui/material';
import classes from './ForgotPassword.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordForm, forgotPasswordSchema } from '../Validators/ForgotPasswordSchema';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { forgotPassword } from 'api/api';
import { ForgotPasswordReq } from 'api/models/forgot-password/forgot-password-req.model';
import withSnackbar, { ShowNotification } from '@components/withSnackbar';

const ForgotPasswordComponent = ({ showNotification }: ForgotPasswordProps) => {
  const { isLoading, mutate } = useMutation(forgotPassword);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm({
    defaultValues: {
      email: '',
    },

    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (formData) => {
    const { email } = formData || {};

    const reqBody: ForgotPasswordReq = {
      email: email?.trim(),
    };

    mutate(reqBody, {
      onSuccess: (res) => {
        navigate('/verify-otp', {
          state: {
            otpToken: res?.otpToken,
            email: email?.trim(),
            isForgotPassword: true,
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
    <>
      <Link className={classes.backBtnLink} to="/login">
        <Button className={classes.backBtn} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
      </Link>

      <div className="headerTitle text-bold-1">Change Password</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
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

        <Button
          className={classes.signUpBtn}
          variant="outlined"
          fullWidth
          type="submit"
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress className={classes.signUpBtnSpinner} size={20} />}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

const ForgotPassword = withSnackbar(ForgotPasswordComponent);

export default ForgotPassword;

interface ForgotPasswordProps {
  showNotification: ShowNotification;
}
