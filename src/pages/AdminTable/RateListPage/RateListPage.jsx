import React, { useEffect, useState } from 'react';
import { AdminList } from '../../../components/AdminList/AdminList';
import { fetchData } from '../../../service/getData';
import { RATE } from '../../../service/urls';
import './style.scss';
import {Loader} from '../../../components/Loader/Loader';
export const RatePageList = () => {
  const [rateData, setRateData] = useState('');

  useEffect(()=>{
    fetchData(RATE).then(({ data }) =>
    setRateData( data.map(
        (el) =>
          (el = {
            updatedAt: new Date(el.updatedAt).toLocaleString('RU'),
            price: `${el.price} ₽ в ${el.rateTypeId?.unit}`,
            id: el.id,
            name: el.rateTypeId?.name,
          }),
      ),
    ),
  )
  .catch(() => history.push('/adminPanel/errorpage'));
  }, []);

  const columns = [
    { name: 'Название тарифа', dataName: 'name' },
    { name: 'Стоимость', dataName: 'price' },
    { name: 'Обновлено', dataName: 'updatedAt' },
  ];

  return (
    <>
      <h1 className='admin__heading'>Список тарифов</h1>
      <div className='rate-page'>
          {rateData ? (
          <AdminList
            columns={columns}
            data={rateData}
          />) : <Loader/>}
      </div>
    </>
  );
};
