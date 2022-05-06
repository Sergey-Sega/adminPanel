/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import './style.scss';
import CityPointMap from './CityPointMap';
import { createData, fetchData } from '../../../service/getData';
import { CITIES, POINTS } from '../../../service/urls';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';

export const CityPointCard = () => {
  const [state, setState] = useState({
    pointName: '',
    address: '',
  });
  const [alert, setAlert] = useState(false);

  const handleChange = useCallback(
    (prop) => (event) => {
      setState((values) => ({ ...values, [prop]: event?.target.value }));
    },
    [setState],
  );

  const handler = (info) => {
    setState({ address: info });
  };

  const createPoint = () => {
    setAlert(false);
    const currentCity = state.address.metaDataProperty.GeocoderMetaData.Address.Components.find(
      (el) => el.kind === 'locality',
    ).name;
    fetchData(CITIES)
      .then(({ data }) => setState({ cities: data }))
      .then(() => {
        const city = state.cities?.filter((el) => el.name === currentCity);
        if (city?.length) {
          createData(POINTS, {
            name: state.pointName,
            cityId: city[0],
            address: state.address.name,
          });
        } else {
          createData(CITIES, { name: currentCity }).then(( {data} ) =>
            createData(POINTS, {
              name: state.pointName,
              cityId: data,
              address: state.address.name,
            }),
          );
        }
      })
      .catch((err) => console.log(err));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
  };

  return (
    <>
    {alert ? (
    <AdminAlert text='Успех, точка выдачи создана!'
        closeAction={()=> setAlert(false)}/>) : null}
      <h1 className="admin__heading">Добавление точки выдачи</h1>
      <div className="city-point-card">
        <div className="city-point-card__content">
          <h3 className="admin__heading">Укажите точку на карте:</h3>
          <div className="city-point-card__map">
            <CityPointMap handler={handler} />
          </div>

          <div className="city-point-card__content__info">
            <h2 className="city-point-card__content__info__head">
              Добавление точки:
            </h2>
            <fieldset>
              <legend>Введите название новой точки выдачи</legend>
              <input
                onChange={handleChange('pointName')}
                className="admin__input"
                type="text"
                name="pointName"
              />
            </fieldset>
            <p className="city-point-card__content__info__text">
              <span className="city-point-card__content__info__text__bold">
                Название точки:
              </span>
              {state.pointName || 'Укажите название'}
            </p>
            {state.address ? (
              <>
                <p className="city-point-card__content__info__text">
                  <span className="city-point-card__content__info__text__bold">
                    Город:
                  </span>
                  {
                    state.address.metaDataProperty.GeocoderMetaData.Address.Components.find(
                      (el) => el.kind === 'locality',
                    ).name
                  }
                </p>
                <p className="city-point-card__content__info__text">
                  <span className="city-point-card__content__info__text__bold">
                    Адрес:
                  </span>
                  {state.address.name}
                </p>
                <p className="city-point-card__content__info__text">
                  <span className="city-point-card__content__info__text__bold">
                    Координаты:
                  </span>
                  {state.address.Point.pos}
                </p>
              </>
            ) : (
              <p className="city-point-card__content__info__text">
                Адрес не указан или указан некорректно.
              </p>
            )}
            <div className="city-point-card__content__info__btn-bar">
              <button className="admin__button blue" onClick={createPoint}>
                Сохранить
              </button>
              <button className="admin__button red">Отменить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
