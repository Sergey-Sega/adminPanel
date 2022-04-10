import { authConnect } from '../../service/Auth';
import { LOGIN, LOGIN_ERRORS } from './actionTypes';


const setLoginErrors = (errors) => ({
  type: LOGIN_ERRORS,
  errors,
});

export const setAuthToken = (token) => ({
  type: LOGIN,
  token,
});

export const login = (values) => async (dispatch) => {
  try {
    const response = await authConnect.login(values);
    localStorage.setItem('token', response.data.access_token);
    dispatch(setAuthToken(response.data.access_token));
    dispatch(setLoginErrors(''));
  } catch {
    dispatch(setLoginErrors('Неверный логин или пароль'));
  }
};
