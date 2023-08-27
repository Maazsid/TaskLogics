import axios, { AxiosError } from 'axios';
import { useAuthStore } from 'store/store';
import { BaseApiResponse } from './models/base-api-res.model';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosClient.interceptors.request.use((req) => {
  const { accessToken, isLoggedIn } = useAuthStore.getState() || {};

  if (isLoggedIn) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError<BaseApiResponse<null>>) => {
    const res = err?.response;

    const { navigate, setIsLoggedIn } = useAuthStore.getState() || {};

    if (res?.status === 401 && navigate) {
      setIsLoggedIn(false);
      navigate('/login');
    }

    return res;
  }
);
