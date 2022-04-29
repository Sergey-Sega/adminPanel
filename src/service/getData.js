/* eslint-disable max-len */
/* eslint-disable quote-props */
import axios from 'axios';
import { APPLICATION_ID, BASE_URL } from '../config';

const axiosInstanse = axios.create();

export const fetchData = async (url) => {
  const headers = {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  };
  try {
    const response = await axiosInstanse({
      url,
      headers,
      baseURL: BASE_URL,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};
