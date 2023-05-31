import axios, { AxiosError } from 'axios';

export const setupInterceptors = () => {
  axios.interceptors.response.use(
    response => response,
    error => {
      const axiosError = error as AxiosError;
      return Promise.reject(
        Error(String(axiosError?.response?.data ?? 'Unknown error')),
      );
    },
  );
};
