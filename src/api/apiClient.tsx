import axios from 'axios';
import { useAuthStore } from 'store/store';

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
