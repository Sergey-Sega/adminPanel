import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <>
      <div className='admin-panel__container__bottombar__link-block'>
        <Link className='admin__link' to='/adminPanel'>
          Главная страница
        </Link>
        <Link className='admin__link' to='/adminPanel/orders'>
          Ссылка
        </Link>
      </div>
      <p className='admin-panel__container__bottombar__copyright'>
        Copyright © 2020 Simbirsoft
      </p>
    </>
  );
};