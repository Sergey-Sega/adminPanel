/* eslint-disable no-unused-vars */
import React from 'react';
import FakeImg from '../../../assets/car.png';

export const CarListCard = ({ el }) => {
  const { name, description, number, colors, tank, thumbnail, id } = el;
  return (
    <div className="car-list-page__car-card" id={id}>
      <div className="car-list-page__car-card__img">
        <img src={thumbnail?.path} alt="car" onError={(e)=> {
        e.target.src=FakeImg;
        }}/>
      </div>
      <div className="car-list-page__car-card__name">
        <p>{name}</p>
      </div>
      <div className="car-list-page__car-card__number">
        <p>{number}</p>
      </div>
      <div className="car-list-page__car-card__colors">
        <p>{colors ? colors.join(', ') : 'Цвета не указаны'}</p>
      </div>
      <div className="car-list-page__car-card__tank">
        <p>{(tank || '0') + '%'}</p>
      </div>
      <div className="car-list-page__car-card__description">
        <p>{description != 'undefined' && description
            ? description
            : 'Описание не указано'}</p>
      </div>
    </div>
  );
};
