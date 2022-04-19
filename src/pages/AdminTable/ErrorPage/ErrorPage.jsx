import React from 'react';
import './style.scss';

export const ErrorPage = ({ errorCode }) => {
  return (
    <div className='error-page'>
      <h1 className='error-page__code'>{errorCode || '500'}</h1>
      <h2 className='error-page__description'>Что-то пошло не так</h2>
      <h3 className='error-page__small-text'>
        Попробуйте перезагрузить страницу
      </h3>
      <button className='admin__button blue'>Вернуться</button>
    </div>
  );
};
