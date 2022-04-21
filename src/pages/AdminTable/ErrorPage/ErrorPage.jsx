import React from 'react';
import './style.scss';

export const ErrorPage = ({ errorCode }) => {
  return (
    <div className='error-page'>
      <div className='error-page__code'>{errorCode || '500'}</div>
      <div className='error-page__description'>Что-то пошло не так</div>
      <div className='error-page__small-text'>
        Попробуйте перезагрузить страницу
      </div>
      <button className='admin__button blue error'>Назад</button>
    </div>
  );
};
