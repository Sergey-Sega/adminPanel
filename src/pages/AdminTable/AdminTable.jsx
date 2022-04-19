import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CarEditCard from './CarEditCard/CarEditCard';
import CityPointCard from './CityPointCard/CityPointCard';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Orders } from './Orders/Orders';
import { RateCreateCard } from './RateCreateCard/RateCreateCard';
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
                  <Route exact path='/adminPanel/rate-edit-card'
                   component={RateCreateCard}/>
                  <Route exact path='/adminPanel/point-edit-card'
                  component={CityPointCard}/>
                  <Route
                  exact path="/adminPanel/car-edit-card"
                  component={CarEditCard}/>
                  <Route exact path='/adminPanel/errorpage'
                  component={ErrorPage}/>
                </Switch>
                </div>
              <div className='admin-panel__container__bottombar'>
                 <Footer/>
              </div>
            </div>
     </div>
  );
  };
