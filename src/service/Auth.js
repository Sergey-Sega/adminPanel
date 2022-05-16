/* eslint-disable quote-props */
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


export const Logout = async (url) => {
  const headers = {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  };
  try {
    const response = await axiosInstance({
      url,
      headers,
      method: 'POST',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};
