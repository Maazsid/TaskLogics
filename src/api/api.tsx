import { axiosClient } from './apiClient';
import { BaseApiResponse } from './models/base-api-res.model';
import { RegisterReq } from './models/register/register-req.model';
import { RegisterRes } from './models/register/register-res.model';

export const registerUser = async (reqBody: RegisterReq): Promise<RegisterRes> => {
  const res = await axiosClient.post('auth/register', reqBody);
  const data: BaseApiResponse<RegisterRes> = res?.data;
  return data?.data;
};
