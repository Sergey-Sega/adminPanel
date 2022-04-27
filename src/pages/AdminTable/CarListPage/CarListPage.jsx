/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './style.scss';
import { CarListCard } from './CarListCard';
import { AdminPagination } from '../../../components/AdminPagination/AdminPagination';
import { Loader } from '../../../components/Loader/Loader';
import { fetchData } from '../../../service/getData';

export default function CarListPage() {
  const [myCars, setMyCars] = useState('');

  const [page, setPage] = useState(1);

  const [countPages, setCountPages] = useState();

  useEffect(()=>{
    fetchData(`db/car?page=${page-1}&limit=4`).then((response)=> {
    setMyCars(response.data);
    setCountPages(Math.ceil(response.count / 4));
    })
    .catch(() => history.push('/adminPanel/errorpage'));
  }, [page]);

  function paginationHandler(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'back':
        setPage(+page - 1);
        break;
      case 'forward':
        setPage(+page + 1);
        break;
      default:
        setPage(value);
        break;
    }
  }

  return (
    <>
      <h1 className="admin__heading">Список автомобилей</h1>
      <div className="car-list-page">
        <div className="car-list-page__container">
          {myCars ? (myCars.map((el) => (
            <React.Fragment key={el.id}>
              <CarListCard el={el} />
            </React.Fragment>
          ))) : <Loader/>}
        </div>
        <AdminPagination page={page} countPages={countPages} paginationHandler={paginationHandler}/>
      </div>
    </>
  );
}
