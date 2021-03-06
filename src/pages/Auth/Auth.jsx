/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import './style.scss';

export const Auth = () => {
  const [authValues, setAuthValues] = useState({
    username: '',
    password: '',
  });

  const error = useSelector(({auth}) => auth.errors);

const handleChange = useCallback(
  (prop) => (event) => {
    setAuthValues((values) => ({ ...values, [prop]: event?.target.value }));
  },
  [setAuthValues],
);

  const dispatch = useDispatch();

  const onFormSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(authValues));
};

  return (
    <div className="admin-panel">
      <div className="authorization">
        <span className="authorization__heading">
          <span className="logo"></span>
          <h2 className="authorization__heading__head">Need for drive</h2>
        </span>
        <div className="authorization__login-block">
          <h3 className="authorization__login-block__name">Вход</h3>
          <form className="authorization__login-block__form" onSubmit={onFormSubmit}>
            <fieldset className="authorization__login-block__form__fieldset">
              <legend>Почта</legend>
              <input
                className="authorization__login-block__form__input"
                type="text"
                onChange={handleChange('username')}
              />
            </fieldset>
            <fieldset className="authorization__login-block__form__fieldset">
              <legend>Пароль</legend>
              <input
                className="authorization__login-block__form__input"
                type="password"
                onChange={handleChange('password')}
              />
              <div className='error'>{error}</div>
            </fieldset>
            <span className="authorization__login-block__form__buttons-block">
              <a className="link" href="#">
                Запросить доступ
              </a>
              <button
                className="admin-button blue"
                type="submit"
              >
                Войти
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
