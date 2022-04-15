import React from 'react';
import './style.scss';
import {SidebarLink} from './SideBarLink';
import { menuSideBar } from '../../../utils/constants';
export const Sidebar = () => {
  return (
    <>
      <a className='sidebar__head'>
        <span className='logo'></span>
        <p className='par'>Need for car</p>
      </a>
       {menuSideBar.map((el, i) => (
        <SidebarLink url={el.url} title={el.name} icon={el.icon} key={i} />
      ))}
    </>
  );
};
