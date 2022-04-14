import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Orders } from './Orders/Orders';
import { Sidebar } from './SideBar/SideBar';
import './style.scss';

export const AdminTable = () => {
  return (
    <div className='admin-panel'>
         <div className='admin-panel__container'>
              <div
              className='admin-panel__container__topbar'
               >
                 <Header/>
              </div>
              <div className='admin-panel__container__sidebar'>
                <Sidebar/>
              </div>
              <div className='admin-panel__container__content'>
                 <Switch>
                  <Route exact path='/adminPanel/orders' component={Orders}/>
                </Switch>
                </div>
              <div className='admin-panel__container__bottombar'>
                 <Footer/>
              </div>
            </div>
     </div>
  );
  };
