/* eslint-disable max-len */
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authActions';
import './style.scss';

export const Auth = () => {
  const [authValues, setAuthValues] = useState({
    username: '',
    password: '',
  });

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
                onChange={(e) =>
                  setAuthValues((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </fieldset>
            <fieldset className="authorization__login-block__form__fieldset">
              <legend>Пароль</legend>
              <input
                className="authorization__login-block__form__input"
                type="password"
                onChange={(e) =>
                  setAuthValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </fieldset>
            <span className="authorization__login-block__form__buttons-block">
              <a className="link" href="#">
                Запросить доступ
              </a>
              <button
                className="admin-button blue"
                type="submit"
                disabled={(!authValues.username.length) || (!authValues.password.length)}
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
