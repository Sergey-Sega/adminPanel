import React from 'react';
import { AdminList } from '../../../components/AdminList/AdminList';
import './style.scss';

export const PointsPage = () => {
  const pointsData = [
      {
        address: 'Литейный проспект 56',
        city: 'Санкт-Петербург',
        name: 'Пункт',
        id: 51,
  },
  {
        address: 'Московское шоссе',
        city: 'Самара',
        name: 'Магнит',
        id: 61,
  },
  {
    name: 'Администрация',
    address: 'ул. Большая Садовая, 47',
    city: 'Ростов-на-Дону',
    id: 71,
    },
    {
      name: 'Администрация',
      address: 'ул. Большая Садовая, 47',
      city: 'Ростов-на-Дону',
      id: 81,
      },
      {
        name: 'Администрация',
        address: 'ул. Большая Садовая, 47',
        city: 'Ростов-на-Дону',
        id: 21,
        },
];

  const cityList = [
    {
    name: 'Санкт-Петербург',
    id: 1125125,
},
{
    name: 'Ульяновск',
    id: 2125125,
},
{
    name: 'Самара',
    id: 3125125,
},
{
    name: 'Нижний Новгород',
    id: 4125125,
},
    ];

  const columns = [
    { name: 'Адрес', dataName: 'address' },
    { name: 'Название', dataName: 'name' },
    { name: 'Город', dataName: 'city' },
  ];

  return (
    <>
      <h1 className='admin__heading'>Список точек выдачи</h1>
      <div className='points-page'>
        <div className='points-page__sort'>
          <select
            className='admin__select'
            name='cityId'
          >
            <option value=''>Все города</option>
            {cityList.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
          </select>
          <select
            className='admin__select'
            name='sort'
          >
            <option value='nameDown'>По названию А-Я ↓</option>
            <option value='nameUp'>По названию Я-А ↑</option>
            <option value='addressUp'>По адресу Я-А ↑</option>
            <option value='addressDown'>По адресу А-Я ↓</option>
          </select>
        </div>
          <AdminList
            columns={columns}
            data={pointsData}
          />
      </div>
    </>
  );
};
