import * as yup from 'yup';
import { object, string } from 'yup';

export const loginSchema = object({
  email: string().required('Email is required').email('Enter valid email'),
  password: string().required('Password is required'),
});

export interface LoginForm extends yup.InferType<typeof loginSchema> {}
