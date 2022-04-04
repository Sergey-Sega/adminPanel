/* eslint-disable max-len */
import React from 'react';
import './style.scss';

export const Auth = () => {
  return (
    <div className='authorization'>
      <span className='authorization__heading'>
        <span className='logo'></span>
         <h2 className='authorization__heading__head'>Need for drive</h2>
         </span>
      <div className='authorization__login-block'>
        <h3 className='authorization__login-block__name'>Вход</h3>
        <form className='authorization__login-block__form'>
          <fieldset className='authorization__login-block__form__fieldset'>
           <legend>Почта</legend>
            <input
              className='authorization__login-block__form__input'
              type='text'
            />
          </fieldset>
          <fieldset className='authorization__login-block__form__fieldset'>
          <legend>Пароль</legend>
            <input
              className='authorization__login-block__form__input'
              type='password'
            />
          </fieldset>
          <span className='authorization__login-block__form__buttons-block'>
            <a className='link' href='#'>
            Запросить доступ
          </a>
          <button className='admin-button blue' type='submit'>
            Войти
          </button>
          </span>
        </form>
      </div>
    </div>
  );
};
