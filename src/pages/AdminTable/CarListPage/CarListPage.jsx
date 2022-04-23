/* eslint-disable max-len */
import React from 'react';
import './style.scss';
import carImg from '../../../assets/car.png';
import { CarListCard } from './CarListCard';
import { AdminPagination } from '../../../components/AdminPagination/AdminPagination';


export default function CarListPage() {
  const page = 1;
  const countPages = 10;
  const thisList = [
    {
      id: 22,
      img: carImg,
      carName: 'Elantra',
      description: 'Очень быстрая',
      number: 'У070ВО175',
      color: 'Синий',
      tank: 15,
    },
    {
      id: 21,
      img: carImg,
      carName: 'Elantra',
      description: 'Очень быстрая',
      number: 'У070ВО175',
      color: 'Синий',
      tank: 35,
    },
    {
      id: 29,
      img: carImg,
      carName: 'Elantra',
      description: 'Очень быстрая',
      number: 'У070ВО175',
      color: 'Синий',
      tank: 23,
    },
    {
      id: 25,
      img: carImg,
      carName: 'Elantra',
      description: 'Очень быстрая',
      number: 'У070ВО175',
      color: 'Синий',
      tank: 23,
    },
  ];

  return (
    <>
      <h1 className="admin__heading">Список автомобилей</h1>
      <div className="car-list-page">
        <div className="car-list-page__container">
          {thisList.map((el) => (
                <CarListCard
                  key={el.id}
                  id={el.id}
                  img={el.img}
                  carName={el.carName}
                  description={el.description}
                  number={el.number}
                  color={el.color}
                  tank={el.tank}
                />
              ))}
        </div>
        <AdminPagination page={page} countPages={countPages} />
      </div>
    </>
  );
}
