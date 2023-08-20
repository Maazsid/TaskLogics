import { axiosClient } from 'api/apiClient';
import { BaseApiResponse } from 'api/models/base-api-res.model';
import { CreateTaskReq } from './models/create-task/create-task-req.model';

export const createTask = async (reqBody: CreateTaskReq): Promise<null> => {
  const res = await axiosClient.post('auth/task', reqBody);
  const data: BaseApiResponse<null> = res?.data;
  return data?.data;
};
