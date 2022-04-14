import React from 'react';
import './style.scss';
import {SidebarLink} from './SideBarLink';
export const Sidebar = () => {
  const menu = [
    { name: 'Карточка автомобиля', url: '/car-edit-card', icon: 'edit' },
    { name: 'Список авто', url: '', icon: 'carList' },
    { name: 'Заказы', url: '/adminPanel/orders', icon: 'orders' },
    { name: 'Тарифы', url: '', icon: 'overview' },
    { name: 'Создание тарифов', url: '', icon: 'forms' },
    { name: 'Точки выдачи', url: '', icon: 'person' },
    { name: 'Добавление точки выдачи', url: '', icon: 'error' },
  ];
  return (
    <>
      <a className='sidebar__head'>
        <span className='logo'></span>
        <p className='par'>Need for car</p>
      </a>
       {menu.map((el, i) => (
        <SidebarLink url={el.url} title={el.name} icon={el.icon} key={i} />
      ))}
    </>
  );
};
