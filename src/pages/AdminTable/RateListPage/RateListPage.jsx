import React from 'react';
import { AdminList } from '../../../components/AdminList/AdminList';
import './style.scss';

export const RatePageList = () => {
 const rateData = [
     {
        price: 2500,
        updatedAt: '23.05.2020',
        name: 'Суточный',
        id: '5e26a082096c5d',
 },
 {
    price: 2500,
    updatedAt: '23.05.2020',
    name: 'Суточный',
    id: '5e26a082099b810b946cd83',
},
{
    price: 2500,
    updatedAt: '23.05.2020',
    name: 'Суточный',
    id: '5e26a08d83',
},
{
    price: 2500,
    updatedAt: '23.05.2020',
    name: 'Суточный',
    id: '5e26a082099b85d83',
},
{
    price: 2500,
    updatedAt: '23.05.2020',
    name: 'Суточный',
    id: '5e2a082099b85d83',
},
];

  const columns = [
    { name: 'Название тарифа', dataName: 'name' },
    { name: 'Стоимость', dataName: 'price' },
    { name: 'Обновлено', dataName: 'updatedAt' },
  ];

  return (
    <>
      <h1 className='admin__heading'>Список тарифов</h1>
      <div className='rate-page'>
          <AdminList
            columns={columns}
            data={rateData}
          />
      </div>
    </>
  );
};
