import * as yup from 'yup';
import { string } from 'yup';

yup.addMethod(string, 'isPasswordMatch', function isPasswordMatch() {
  return this.test({
    name: 'isPasswordMatch',
    message: 'Passwords do not match',
    test: (value, context) => {
      return context?.parent?.password === value;
    },
  });
});

yup.addMethod(string, 'checkPasswordStrength', function checkPasswordStrength() {
  return this.test({
    name: 'checkPasswordStrength',
    message: '',
    test: (value, context) => {
      value = value || '';
      const atleastOneLowerCaseChar = /^(?=.*[a-z])/.test(value);
      const atleastOneUpperCaseChar = /^(?=.*?[A-Z])/.test(value);
      const atLeastOneDigit = /^(?=.*?[0-9])/.test(value);
      const atleastOneSpecialChar = /^(?=.*?[#?!@$%^&*-])/.test(value);
      const minimumEightLength = /^.{8,}/.test(value);

      let type = '';

      if (!atleastOneLowerCaseChar) {
        type = `${type} atleastOneLowerChar`;
      }

      if (!atleastOneUpperCaseChar) {
        type = `${type} atleastOneUpperCaseChar`;
      }
      if (!atLeastOneDigit) {
        type = `${type} atLeastOneDigit`;
      }

      if (!atleastOneSpecialChar) {
        type = `${type} atleastOneSpecialChar`;
      }
      if (!minimumEightLength) {
        type = `${type} minimumEightLength`;
      }

      if (type?.trim()) {
        return context.createError({ type: type });
      }

      return true;
    },
  });
});

export const registrationSchema = yup.object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().required('Email is required').email('Enter valid email'),
  password: string().required('Password is required').checkPasswordStrength(),
  confirmPassword: string().required('Confirm password is required').isPasswordMatch(),
});

export interface RegistrationForm extends yup.InferType<typeof registrationSchema> {}

export const checkPasswordList = [
  {
    key: 'atleastOneLowerChar',
    message: 'One lower case character',
  },
  {
    key: 'atleastOneUpperCaseChar',
    message: 'One upper case character',
  },
  {
    key: 'atLeastOneDigit',
    message: 'One number',
  },
  {
    key: 'atleastOneSpecialChar',
    message: 'One special character',
  },
  {
    key: 'minimumEightLength',
    message: '8 character minimum',
  },
];
