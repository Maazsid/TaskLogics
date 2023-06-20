import { Button, TextField } from '@mui/material';
import classes from './ForgotPassword.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordForm, forgotPasswordSchema } from '../Validators/ForgotPasswordSchema';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const ForgotPassword = () => {
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

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    return;
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

        <Button className={classes.signUpBtn} variant="outlined" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
