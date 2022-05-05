/* eslint-disable max-len */
/* eslint-disable quote-props */
import axios from 'axios';
import { APPLICATION_ID, BASE_URL } from '../config';

const axiosInstanse = axios.create({baseURL: BASE_URL});

const headers = {
  'X-Api-Factory-Application-Id': APPLICATION_ID,
  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
};

export const fetchData = async (url) => {
  try {
    const response = await axiosInstanse({
      url,
      headers,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axiosInstanse({
      url,
      headers,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const createData = async (url, body) => {
  try {
    const response = await axiosInstanse({
      url,
      headers,
      method: 'POST',
      data: body,
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const putData = async (url, body) => {
  try {
    const response = await axiosInstanse({
      url,
      headers,
      method: 'PUT',
      data: body,
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};
