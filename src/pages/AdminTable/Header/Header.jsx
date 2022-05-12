/* eslint-disable new-cap */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logout } from '../../../service/Auth';
import person from './../../../assets/user-avatar.png';
import './style.scss';
export const Header = () => {
  const history = useHistory();

  const logout = () => {
    Logout('auth/logout')
      .then(() => {
        window.sessionStorage.clear();
        window.location.reload(false);
        history.push('/');
});
  };

  return (
    <>
      <form className='searching-form'>
        <span className='icon shape'></span>
        <input
          className='searching-form__input'
          type='text'
          name='search'
          placeholder='Поиск..'
        />
      </form>
      <div className='notifications-block'>
        <span className='notifications-block__icon'></span>
        <span className='notifications-block__counter'>1</span>
      </div>
      <div className='user-block'>
        <div className='user-block__group'>
          <span className='user-block__group__user-info'>
            <img
              alt='Аватар пользователя'
              className='user-block__group__user-info__user-pic'
              src={person}
            />
            <p className='user-block__group__user-info__user-name'>
            Администратор
            </p>
          </span>
          <span className='user-block__wrapper'>
            <span></span>
          </span>
        </div>
        <div className='user-block__logout'>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </>
  );
};
