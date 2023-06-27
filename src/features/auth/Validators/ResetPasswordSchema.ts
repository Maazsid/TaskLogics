import * as yup from 'yup';
import { object, string } from 'yup';

export const resetPasswordSchema = object({
  password: string().trim().required('Password is required').checkPasswordStrength(),
  confirmPassword: string().trim().required('Confirm password is required').isPasswordMatch(),
});

export interface ResetPasswordSchema extends yup.InferType<typeof resetPasswordSchema> {}
