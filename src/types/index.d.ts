import { StringSchema } from 'yup';

declare module 'yup' {
   interface StringSchema {
    isPasswordMatch(): this;
    checkPasswordStrength(): this;
  }
}