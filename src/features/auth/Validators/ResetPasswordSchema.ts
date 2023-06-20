import * as yup from 'yup';
import { object, string } from 'yup';

export const resetPasswordSchema = object({
  password: string().required('Password is required').checkPasswordStrength(),
  confirmPassword: string().required('Confirm password is required').isPasswordMatch(),
});

export interface ResetPasswordSchema extends yup.InferType<typeof resetPasswordSchema> {}
