/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';
import AdminInput from '../../../components/AdminInput/AdmitInput';
import { Warning } from '../../../components/Warning/Warning';
import { createData, fetchData } from '../../../service/getData';
import { RATE } from '../../../service/urls';
import './style.scss';
export const RateCreateCard = () => {
  const history = useHistory();

  const [price, setPrice] = useState(1);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [rates, setRates] = useState([]);
  const [alert, setAlert] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    fetchData('db/rate')
      .then(({ data }) => setRates(data))
      .catch((err) => {
        history.push('/adminPanel/errorpage');
        console.error(err);
      });
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
    const rateId = rates.find(
      (el) => el.rateTypeId.unit === unit & el.rateTypeId.name === name,
    )?.id;
    if (rateId) {
      setWarning(true);
  } else {
      createData(`db/rateType`, {
        unit: unit,
        name: name,
      })
        .then(({ data }) =>
          createData(RATE, {
            price: price,
            rateTypeId: {
              id: data.id,
            },
          }),
        )
        .catch((err) => {
          history.push('/adminPanel/errorpage');
        })
        .finally(() => {
          setPrice(1);
          setUnit('');
          setName('');
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        });
    }
  };

  return (
    <>
      {alert ? (
        <AdminAlert
          text="Успех, тариф сохранен!"
          closeAction={() => setAlert(false)}
        />
      ) : null}
      {warning ? (
        <Warning
        warningText='Такой тариф уже существует!'
        closeAction={() => setWarning(false)}
        />
      ) : null}
      <h1 className="admin__heading">Создание тарифов</h1>
      <div className="create-rate-block">
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
        <div className="create-rate-block__btn-bar">
          <button
            disabled={(!price || !unit || !name) && 'disabled'}
            onClick={createRate}
            className="admin__button blue"
          >
            Сохранить
          </button>
          <button
          onClick={()=> history.push('/rate-list')}
           className="admin__button gray">Отменить</button>
        </div>
      </div>
    </>
  );
};
