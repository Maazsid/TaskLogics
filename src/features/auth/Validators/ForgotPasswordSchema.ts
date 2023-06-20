import { InferType, object, string } from 'yup';

export const forgotPasswordSchema = object({
  email: string().required('Email is required').email('Enter valid email'),
});

export interface ForgotPasswordForm extends InferType<typeof forgotPasswordSchema> {}
