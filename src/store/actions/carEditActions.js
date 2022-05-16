/* eslint-disable no-unused-vars */
import { fetchData } from '../../service/getData';
import { CAR_EDIT, CAR_EDIT_CLEAR } from './actionTypes';

export const setCarEdit = (data) => ({
  type: CAR_EDIT,
  data,
});

export const fetchCar = (carId) => async (dispatch) => {
    try {
    const res = await fetchData(`db/car/${carId}`);
    dispatch(setCarEdit(res.data));
    } catch (error) {
        console.error('error');
    }
  };
