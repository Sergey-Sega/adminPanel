/* eslint-disable max-len */
import React from 'react';
import './style.scss';
import {SidebarLink} from './SideBarLink';
import { menuSideBar } from '../../../utils/constants';
export const Sidebar = ({sidebarRef}) => {
  console.log(sidebarRef.current);
  return (
    <>
      <a className='sidebar__head' onClick={()=> sidebarRef.current.classList.add('widthSide')}>
        <span className='logo'></span>
        <p className='par'>Need for car</p>
      </a>
       {menuSideBar.map((el, i) => (
        <SidebarLink url={el.url} title={el.name} icon={el.icon} key={i} onClick={()=>sidebarRef.current.classList.remove('widthSide')}/>
      ))}
    </>
  );
};
