import { axiosClient } from './apiClient';
import { BaseApiResponse } from './models/base-api-res.model';
import { RegisterReq } from './models/register/register-req.model';
import { RegisterRes } from './models/register/register-res.model';
import { VerifyOtpReq } from './models/verify-otp/verify-otp-req.model';

export const registerUser = async (reqBody: RegisterReq): Promise<RegisterRes> => {
  const res = await axiosClient.post('auth/register', reqBody);
  const data: BaseApiResponse<RegisterRes> = res?.data;
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

export const verifyOtpCode = async ({
  requestBody,
  otpToken,
}: VerifyOtpCodeParams): Promise<{ accessToken: string }> => {
  const res = await axiosClient.post('auth/verify-otp', requestBody, {
    headers: {
      Authorization: `Bearer ${otpToken}`,
    },
    withCredentials: true,
  });

  const data: BaseApiResponse<{ accessToken: string }> = res?.data;

  return data?.data;
};

interface VerifyOtpCodeParams {
  requestBody: VerifyOtpReq;
  otpToken: string;
}
