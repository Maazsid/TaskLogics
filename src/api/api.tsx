import { axiosClient } from './apiClient';
import { BaseApiResponse } from './models/base-api-res.model';
import { ForgotPasswordReq } from './models/forgot-password/forgot-password-req.model';
import { ForgotPasswordRes } from './models/forgot-password/forgot-password-res.model';
import { LoginReq } from './models/login/login-req';
import { LoginRes } from './models/login/login-res';
import { RegisterReq } from './models/register/register-req.model';
import { RegisterRes } from './models/register/register-res.model';
import { ResetPasswordReq } from './models/reset-password/reset-password-req.model';
import { VerifyOtpReq } from './models/verify-otp/verify-otp-req.model';
import { VerifyOtpRes } from './models/verify-otp/verify-otp-res.model';

export const loginUser = async (reqBody: LoginReq): Promise<LoginRes> => {
  const res = await axiosClient.post('auth/login', reqBody);
  const data: BaseApiResponse<LoginRes> = res?.data;
  return data?.data;
};
export const registerUser = async (reqBody: RegisterReq): Promise<RegisterRes> => {
  const res = await axiosClient.post('auth/register', reqBody);
  const data: BaseApiResponse<RegisterRes> = res?.data;
  return data?.data;
};

export const forgotPassword = async (reqBody: ForgotPasswordReq): Promise<ForgotPasswordRes> => {
  const res = await axiosClient.post('auth/forgot-password', reqBody);
  const data: BaseApiResponse<ForgotPasswordRes> = res?.data;
  return data?.data;
};

export const resetPassword = async ({
  requestBody,
  resetPasswordToken,
}: ResetPasswordParams): Promise<null> => {
  const res = await axiosClient.post('auth/reset-password', requestBody, {
    headers: {
      Authorization: `Bearer ${resetPasswordToken}`,
    },
    withCredentials: true,
  });

  const data: BaseApiResponse<null> = res?.data;

  return data?.data;
};

export const verifyOtpCode = async ({
  requestBody,
  otpToken,
}: VerifyOtpCodeParams): Promise<VerifyOtpRes> => {
  const res = await axiosClient.post('auth/verify-otp', requestBody, {
    headers: {
      Authorization: `Bearer ${otpToken}`,
    },
    withCredentials: true,
  });

  const data: BaseApiResponse<VerifyOtpRes> = res?.data;

  return data?.data;
};

export const resendOtp = async (otpToken: string): Promise<null> => {
  const res = await axiosClient.post(
    'auth/resend-otp',
    {},
    {
      headers: {
        Authorization: `Bearer ${otpToken}`,
      },
    }
  );

  const data: BaseApiResponse<null> = res?.data;

  return data?.data;
};

interface VerifyOtpCodeParams {
  requestBody: VerifyOtpReq;
  otpToken: string;
}

interface ResetPasswordParams {
  requestBody: ResetPasswordReq;
  resetPasswordToken: string;
}
