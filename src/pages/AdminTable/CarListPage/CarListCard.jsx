import React from 'react';
import fakeCar from '../../../assets/car.png';
export const CarListCard = ({ carName, description, number, color, tank }) => {
  return (
    <div className="car-list-page__car-card">
      <div className="car-list-page__car-card__img">
        <img src={fakeCar} alt="car" />
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
