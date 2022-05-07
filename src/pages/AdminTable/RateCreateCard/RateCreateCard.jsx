/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';
import AdminInput from '../../../components/AdminInput/AdmitInput';
import { createData, fetchData, putData } from '../../../service/getData';
import { RATE } from '../../../service/urls';
import './style.scss';
export const RateCreateCard = () => {
  const [rateTypes, setRateTypes] = useState([]);
  const [price, setPrice] = useState(1);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [rates, setRates] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    fetchData('db/rateType')
      .then(({ data }) => setRateTypes(data))
      .catch((err) => console.error(err));
      fetchData('db/rate')
      .then(({ data }) => setRates(data))
      .catch((err) => console.error(err));
  }, []);

  const inputs = [
    {
      id: 1,
      legend: 'Стоимость *',
      onChange: onChangeHandler,
      name: 'price',
      value: price,
      placeholder: 'Введите стоимость в рублях',
      type: 'number',
    },
    {
      id: 2,
      legend: 'Название тарифа *',
      onChange: onChangeHandler,
      name: 'name',
      value: name,
      placeholder: 'Введите название тарифа',
    },
    {
      id: 3,
      legend: 'Единица измерения тарифа *',
      onChange: onChangeHandler,
      name: 'unit',
      value: unit,
      placeholder: 'Введите единицу измерения тарифа',
    },
  ];

  function onChangeHandler(event) {
    const { name, value } = event.target;
    if (name === 'price') {
      setPrice(value);
    } else if (name === 'name') {
      setName(value);
    } else {
      setUnit(value);
    }
  }

  const createRate = () => {
    const rateType=rateTypes.find((el) => el.unit === unit || el.name === name);
    const rateId=rates.find((el) => el.rateTypeId.unit === unit || el.rateTypeId.name === name)?.id;
    const body = {
      price: price,
      rateTypeId: {
        id: rateType?.id,
      },
    };
    if (rateId) {
      putData(`${RATE}/${rateId}`, body);
      setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
    } else if (rateType) {
      createData(RATE, body);
      setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
    } else {
     createData(`db/rateType`, {
        unit: unit,
        name: name,
      })
        .then(({data}) =>
          createData( RATE, {
            price: price,
            rateTypeId: {
              id: data.id,
            },
          }),
        );
    }
    setPrice(1),
    setName(''),
    setUnit(''),
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <>
    {alert ? (
    <AdminAlert text='Успех, тариф сохранен!'
    closeAction={() => setAlert(false)}/>) : null}
      <h1 className='admin__heading'>Создание тарифов</h1>
      <div className='create-rate-block'>
        <div>
          {inputs.map((el) => (
            <AdminInput
              isNumber={el.type}
              key={el.id}
              name={el.name}
              value={el.value}
              placeholder={el.placeholder}
              legend={el.legend}
              onChange={el.onChange}
            />
          ))}
        </div>
        <div className='create-rate-block__btn-bar'>
          <button
            disabled={(!price || !unit || !name) && 'disabled'}
            onClick={createRate}
            className='admin__button blue'
          >
            Сохранить
          </button>
          <button className='admin__button gray'>Отменить</button>
        </div>
      </div>
    </>
  );
};
