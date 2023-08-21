import { axiosClient } from 'api/apiClient';
import { BaseApiResponse } from 'api/models/base-api-res.model';
import { CreateTaskReq } from './models/create-task/create-task-req.model';
import { GetTaskReq } from './models/get-task/get-task-req.model';
import { GetTaskRes } from './models/get-task/get-task-res.model';
import { UpdateTaskReq } from './models/update-task/update-task-req.model';

export const getTasks = async (queryParams: GetTaskReq): Promise<GetTaskRes> => {
  const res = await axiosClient.get('task', {
    params: queryParams,
  });
  const data: BaseApiResponse<GetTaskRes> = res?.data;
  return data?.data;
};

export const createTask = async (reqBody: CreateTaskReq): Promise<null> => {
  const res = await axiosClient.post('task', reqBody);
  const data: BaseApiResponse<null> = res?.data;
  return data?.data;
};

export const updateTask = async ({
  reqBody,
  taskId,
}: {
  reqBody: UpdateTaskReq;
  taskId: string;
}): Promise<null> => {
  const res = await axiosClient.put(`task/${taskId}`, reqBody);
  const data: BaseApiResponse<null> = res?.data;
  return data?.data;
};

export const deleteTask = async (taskId: string): Promise<null> => {
  const res = await axiosClient.delete(`task/${taskId}`);
  const data: BaseApiResponse<null> = res?.data;
  return data?.data;
};
