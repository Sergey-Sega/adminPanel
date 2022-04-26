/* eslint-disable no-unused-vars */
import React from 'react';

export const CarListCard = ({ el }) => {
  const { carName, description, number, color, tank, img, id } = el;
  return (
    <div className="car-list-page__car-card" id={id}>
      <div className="car-list-page__car-card__img">
        <img src={img} alt="car" />
      </div>
      <div className="car-list-page__car-card__name">
        <p>{carName}</p>
      </div>
      <div className="car-list-page__car-card__number">
        <p>{number}</p>
      </div>
      <div className="car-list-page__car-card__colors">
        <p>{color}</p>
      </div>
      <div className="car-list-page__car-card__tank">
        <p>{tank + '%'}</p>
      </div>
      <div className="car-list-page__car-card__description">
        <p>{description}</p>
      </div>
    </div>
  );
};
