import React, { useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import CarEditCard from './CarEditCard/CarEditCard';
import CarListPage from './CarListPage/CarListPage';
import CityPointCard from './CityPointCard/CityPointCard';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Orders } from './Orders/Orders';
import { PointsPage } from './PointsPage/PointsPage';
import { RateCreateCard } from './RateCreateCard/RateCreateCard';
import { RatePageList } from './RateListPage/RateListPage';
import { Sidebar } from './SideBar/SideBar';
import './style.scss';

export const AdminTable = () => {
  const ref = useRef();
  return (
    <div className='admin-panel'>
         <div className='admin-panel__container'>
              <div
              className='admin-panel__container__topbar'
               >
                 <Header/>
              </div>
              <div className='admin-panel__container__sidebar' ref={ref}>
                <Sidebar sidebarRef={ref}/>
              </div>
              <div className='admin-panel__container__content'>
                 <Switch>
                  <Route exact path='/adminPanel/orders' component={Orders}/>
                  <Route exact path='/points-list' component={PointsPage} />
                  <Route exact path='/rate-list' component={RatePageList} />
                  <Route exact path='/car-list' component={CarListPage} />
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
