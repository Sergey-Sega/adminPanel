/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AdminList } from '../../../components/AdminList/AdminList';
import { fetchData } from '../../../service/getData';
import { RATE } from '../../../service/urls';
import './style.scss';
import { Loader } from '../../../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
export const RatePageList = () => {
  const history = useHistory();
  const [rateData, setRateData] = useState('');
  const [isDelete, setDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRateData();
  }, []);

  const getRateData = () => {
    fetchData(RATE)
      .then(({ data }) =>
        setRateData(
          data.map(
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
      .catch(() =>{
        history.push('/adminPanel/errorpage');
}
      ,
     ).finally(()=>{
        setIsLoading(false);
      });
  };

  const columns = [
    { name: 'Название тарифа', dataName: 'name' },
    { name: 'Стоимость', dataName: 'price' },
    { name: 'Обновлено', dataName: 'updatedAt' },
  ];

  const shouldShowNoResult = !Object.values(rateData ?? {}).length;

  return (
    <>
      <h1 className="admin__heading">Список тарифов</h1>
      <div className="rate-page">
        {!isLoading &&
          (!shouldShowNoResult ? (
            <AdminList
              columns={columns}
              tableName="db/rate/"
              data={rateData}
              setDelete={setDelete}
              update={getRateData}
            />
          ) : (
            <>
              <h1 className="error_rates">Нет доступных тарифов</h1>
            </>
          ))}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
