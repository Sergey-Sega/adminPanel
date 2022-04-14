/* eslint-disable max-len */
import React, { Fragment } from 'react';
import './style.scss';
import fakeCar from '../../../assets/car.png';
import { useState } from 'react';
import { CustomCheckbox } from '../../../components/CustomCheckBox/CustomCheckBox';
import { AdminPagination } from '../../../components/AdminPagination/AdminPagination';

export const Orders = () => {
  const options = [
    { name: 'isFullTank', description: 'Полный бак' },
    { name: 'isNeedChildChair', description: 'Детское кресло' },
    { name: 'isRightWheel', description: 'Правый руль' },
  ];
  const [page, setPage] = useState(1);
  const countPages = 10;

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
      <h1 className="admin__heading">Заказы</h1>
      <div className="order-block">
        <div className="order-block__sort-container">
          <form className="order-block__sort-container__sort">
            <select className="admin__select" name="period">
              <option>За неделю</option>
              <option>За месяц</option>
              <option>За сутки</option>
              <option>За три часа</option>
            </select>
            <select className="admin__select" name="carName">
              <option>Elantra</option>
              <option>Elantra 2</option>
              <option>Elantra 3</option>
              <option>Elantra 4</option>
            </select>
            <select className="admin__select" name="city">
              <option>Ульяновск</option>
              <option>Саранск</option>
              <option>Саратов</option>
            </select>
            <select className="admin__select" name="status">
              <option>В процессе</option>
              <option>Отменен</option>
              <option>Выполнен</option>
            </select>
            <button className="admin__button blue" type="submit">
              Применить
            </button>
          </form>
        </div>
        <div className="order-block__info">
          <span className="order-block__info__part">
            <img
              crossOrigin="anonymous"
              referrerPolicy="origin"
              className="order-block__info__img"
              src={fakeCar}
              alt="car"
            />
            <p className="order-block__info__text">
              <span>{'' || 'Elantra'}</span> в{' '}
              <span>{'' || 'Ульяновск, Нариманова 42'}</span> <br />
              {'' || '01.01.2001 01:01'} - {'' || '01.01.2001 01:01'}
              <br />
              Цвет: <span>{'' || 'Голубой'}</span>
            </p>
          </span>
          <span className="order-block__info__part">
            <span className="order-block__info__chechboxes">
              {options.map((el, i) => (
                <Fragment key={i}>
                  <CustomCheckbox
                    type="checkbox"
                    description={el.description}
                    name={el.name}
                    checked={true}
                  />
                  <br />
                </Fragment>
              ))}
            </span>
            <p className="order-block__info__cost">{'' || '4300'} ₽</p>
            <span className="order-block__info__buttons">
              <button className="order-block__info__buttons__ok">
                <span>✔</span> Готово
              </button>
              <button className="order-block__info__buttons__cancel">
                <span>✖</span> Отмена
              </button>
              <button className="order-block__info__buttons__edit">
                <span>⁝</span> Изменить
              </button>
            </span>
          </span>
        </div>
        <div className="order-block__pagination">
          <AdminPagination
            paginationHandler={paginationHandler}
            page={page}
            countPages={countPages}
          />
        </div>
      </div>
    </>
  );
};
