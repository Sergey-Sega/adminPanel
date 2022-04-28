/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AdminList } from '../../../components/AdminList/AdminList';
import { Loader } from '../../../components/Loader/Loader';
import { fetchData } from '../../../service/getData';
import { CITIES } from '../../../service/urls';
import './style.scss';

export const PointsPage = () => {
  const [pointsData, setPointsData] = useState('');
  const [cityList, setCityList] = useState('');
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('name');
  const [trend, setTrend] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setPointsData('');
    fetchData(
      `db/point?${city && '&cityId=' + city}${
        sort && `&sort[${sort}]=${trend}`
      }`,
    )
      .then((res) => {
        setPointsData(
          res.data.map(
            (el) =>
              (el = {
                address: el.address,
                name: el.name,
                id: el.id,
                city: el.cityId?.name,
              }),
          ),
        );
      })
      .then(() => fetchData(CITIES).then(({ data }) => setCityList(data)))
      .catch((err) => console.error('ERROR', err)).finally(()=> {
setIsLoading(false);
});
  }, [city, sort, trend]);

  const columns = [
    { name: 'Город', dataName: 'city' },
    { name: 'Адрес', dataName: 'address' },
    { name: 'Название', dataName: 'name' },
  ];

  function filterHandler(event) {
    const { name, value } = event.target;
    if (name == 'cityId') {
      setCity(value);
    } else {
      switch (value) {
        case 'nameUp':
          setSort('name');
          setTrend('-1');
          break;
        case 'addressUp':
          setSort('address');
          setTrend('-1');
          break;
        case 'nameDown':
          setSort('name');
          setTrend('1');
          break;
        case 'addressDown':
          setSort('address');
          setTrend('1');
          break;
        default:
          history.push('/admin/error-page/');
      }
    }
  }
  const shouldShowNoResult = !Object.values(pointsData ?? {}).length;
  return (
    <>
      <h1 className="admin__heading">Список точек выдачи</h1>
      <div className="points-page">
        <div className="points-page__sort">
          <select
            className="admin__select"
            name="cityId"
            onChange={filterHandler}
          >
            <option value="">Все города</option>
            {cityList
              ? cityList.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))
              : null}
          </select>
          <select
            onChange={filterHandler}
            className="admin__select"
            name="sort"
          >
            <option value="nameDown">По названию А-Я ↓</option>
            <option value="nameUp">По названию Я-А ↑</option>
            <option value="addressUp">По адресу Я-А ↑</option>
            <option value="addressDown">По адресу А-Я ↓</option>
          </select>
        </div>
        {!isLoading && (!shouldShowNoResult ? <AdminList columns={columns} data={pointsData}/> : (<><h1 className='error_points'>Нет доступных точек выдачи</h1></>))}
        {isLoading && <Loader/>}
      </div>
    </>
  );
};
