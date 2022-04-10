import axios from 'axios';
import { APPLICATION_ID, BASE_URL, SECRET } from '../config';

const token = btoa(`10d8c9d:${SECRET}`);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
    'Access-Control-Allow-Credentials': true,
    'Authorization': `Basic ${token}`,
  },
});


const authLogin = () => {
  return axiosInstance;
};

export const authConnect = {
    login: (body) => authLogin().post('/auth/login', body),
  };
