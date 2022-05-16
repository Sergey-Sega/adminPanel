/* eslint-disable max-len */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

export const ErrorPage = ({ errorCode }) => {
  const history = useHistory();
  return (
    <div className="error-page">
      <div className="error-page__code">{errorCode || '500'}</div>
      <div className="error-page__description">Что-то пошло не так</div>
      <div className="error-page__small-text">
        Попробуйте перезагрузить страницу
      </div>
      <button onClick={() => history.goBack()} className="admin__button blue error">
        Назад
      </button>
    </div>
  );
};
