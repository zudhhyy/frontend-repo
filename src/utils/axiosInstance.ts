import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getAuthToken } from '@/utils/getAuthToken';
import { store } from '@/store/store';
import { logout } from '@/store/slicers/userSlice';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5001/ebuddy-technical-test-1aac5/us-central1/api',
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getAuthToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Error fetching token:', error);

      store.dispatch(logout());
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
