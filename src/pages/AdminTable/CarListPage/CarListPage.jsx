/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './style.scss';
import { CarListCard } from './CarListCard';
import { AdminPagination } from '../../../components/AdminPagination/AdminPagination';
import { Loader } from '../../../components/Loader/Loader';
import { fetchData } from '../../../service/getData';
import { CARS } from '../../../service/urls';
import { SelectFilter } from '../../../components/SelectFilter/SelectFilter';

export const CarListPage = () => {
  const [myCars, setMyCars] = useState('');
  const [filterCar, setFilterCar] =useState({});
  const [page, setPage] = useState(1);
  const [filterList, setFilterList] = useState({
  cars: [],
  });
  const [filter, setFilter] = useState({
    carId: '',
  });
  const [countPages, setCountPages] = useState();

  useEffect(()=>{
    getCarsTable();
  }, [page]);

  useEffect(()=>{
    createFilters();
  }, [page]);

  const getCarsTable = () => {
    const { carId } = filter;
    fetchData(
      `db/car?page=${page - 1}&limit=4&name[$gt]=${carId && '&carId=' + carId}`,
    ).then((response)=> {
      setMyCars(response.data);
      setCountPages(Math.ceil(response.count / 4));
      })
      .catch(() => history.push('/adminPanel/errorpage'));
  };

  const fetchCar = () => {
    const { carId } = filter;
    const res = fetchData(
      `db/car/${carId}`,
    ).then((res)=>{
      setFilterCar(res.data);
      setCountPages(1);
    }).catch((error)=> console.error(error));
  };

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
  function filterHandler(event) {
    const { name, value } = event.target;
     setFilter({ ...filter, [name]: value });
  }


  function createFilters() {
    let cars;
        fetchData(CARS)
          .then(({ data }) => {
            cars = data;
          })
              .then(() =>
                setFilterList({
                  cars: cars,
                }),
              );
  }

  const selectList = [
    {
      name: 'carId',
      options: filterList.cars,
      defaultOption: { label: 'Все автомобили', value: '' },
    },
  ];

  return (
    <>
      <h1 className="admin__heading">Список автомобилей</h1>
      <div className="car-list-page">
      <div className="order-block__sort-container">
          <span onClick={createFilters} className="filter-icon"></span>
          <form className="order-block__sort-container__sort">
             {selectList.map(({ name, options, defaultOption }) => (
              <SelectFilter
                name={name}
                options={options}
                className="admin__select"
                onChange={filterHandler}
                key={name}
                defaultOption={defaultOption}
              />
            ))}
            <button
              onClick={()=> {
                setPage(1);
                getCarsTable();
                fetchCar();
}}
              className="admin__button blue"
              type="button"
            >
              Применить
            </button>
          </form>
        </div>
        <div className="car-list-page__container">
          {myCars ? (myCars.map((el) => (
            <React.Fragment key={el.id}>
              <CarListCard el={el}/>
            </React.Fragment>
          ))) : <Loader/>}
         {Object.values(filterCar).length ? (
         <CarListCard el={filterCar} />
           ) : null}
        </div>
        <AdminPagination page={page} countPages={countPages} paginationHandler={paginationHandler}/>
      </div>
    </>
  );
};
