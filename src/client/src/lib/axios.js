import Axios from 'axios';
import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config) {
  const localStorage = storage.getToken();
  if (localStorage.token) {
    config.headers.authorization = `${localStorage.token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);