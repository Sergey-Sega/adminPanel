/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable max-len */
import React, { Fragment, useEffect } from 'react';
import './style.scss';
import fakeCar from '../../../assets/car.png';
import { useState } from 'react';
import { CustomCheckbox } from '../../../components/CustomCheckBox/CustomCheckBox';
import { AdminPagination } from '../../../components/AdminPagination/AdminPagination';
import { SelectFilter } from '../../../components/SelectFilter/SelectFilter';
import { CARS, CITIES, ORDER, ORDER_STATUS } from '../../../service/urls';
import { fetchData, putData } from '../../../service/getData';
import { Loader } from '../../../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';

export const Orders = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState({});
  const [countPages, setCountPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [filterList, setFilterList] = useState({
    cities: [],
    cars: [],
    statuses: [],
  });
  const [filter, setFilter] = useState({
    date: 0,
    carId: '',
    cityId: '',
    status: '',
  });
  const options = [
    { name: 'isFullTank', description: 'Полный бак' },
    { name: 'isNeedChildChair', description: 'Детское кресло' },
    { name: 'isRightWheel', description: 'Правый руль' },
  ];

  useEffect(() => {
    getOrderTable();
  }, [page]);

  useEffect(() => {
    createFilters();
  }, []);

  function getOrderTable() {
    const { carId, date, cityId, status } = filter;
    setIsLoading(true);
    fetchData(
      `db/order?page=${page - 1}&limit=1&createdAt[$gt]=${date}${
        carId && '&carId=' + carId
      }${cityId && '&cityId=' + cityId}${status && '&orderStatusId=' + status}`,
    )
      .then((res) => {
        setCurrentOrder(res.data[0]);
        setCountPages(res.count);
      })
      .catch((err) => {
        history.push('/adminPanel/errorpage');
      })
      .finally(() => setIsLoading(false));
  }

  function filterHandler(event) {
    const now = new Date();
    const { name, value } = event.target;
    if (name === 'date') {
      switch (value) {
        case 'all':
          setFilter({ ...filter, [name]: 0 });
          break;
        case 'month':
          setFilter({
            ...filter,
            [name]: now.setMonth(now.getMonth() - 1),
          });
          break;
        case 'week':
          setFilter({ ...filter, [name]: now.setDate(now.getDate() - 7) });
          break;
        case 'day':
          setFilter({ ...filter, [name]: now.setDate(now.getDate() - 1) });
          break;
        case 'hours':
          setFilter({
            ...filter,
            [name]: now.setHours(now.getHours() - 3),
          });
          break;
      }
    } else if (name === 'carId' || name === 'cityId' || name === 'status') {
      setFilter({ ...filter, [name]: value });
    }
  }

  function createFilters() {
    let cars;
    let cities;
    let statuses;
    fetchData(CITIES)
      .then(({ data }) => {
        cities = data;
      })
      .then(() => {
        fetchData(CARS)
          .then(({ data }) => {
            cars = data;
          })
          .then(() => {
            fetchData(ORDER_STATUS)
              .then(({ data }) => {
                statuses = data;
              })
              .then(() =>
                setFilterList({
                  cars: cars,
                  cities: cities,
                  statuses: statuses,
                }),
              );
          });
      });
  }

  const doneCar = async () => {
    const body = { ...currentOrder, orderStatusId: filterList.statuses[4] };
    const putOrder = await putData(`${ORDER}/${currentOrder.id}`, body);
    if (!putOrder) {
      history.push('/adminPanel/errorpage');
    }
    return putOrder;
  };

  const cancelCar = async () => {
    const body = { ...currentOrder, orderStatusId: filterList.statuses[1] };
    const putOrder = await putData(`${ORDER}/${currentOrder.id}`, body);
    if (!putOrder) {
      history.push('/adminPanel/errorpage');
    }
    return putOrder;
  };

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

  const selectList = [
    {
      name: 'date',
      options: [
        { id: 'month', name: 'За месяц' },
        { id: 'week', name: 'За неделю' },
        { id: 'day', name: 'За сутки' },
        { id: 'hours', name: 'За три часа' },
      ],
      defaultOption: { label: 'За все время', value: 'all' },
    },
    {
      name: 'carId',
      options: filterList.cars,
      defaultOption: { label: 'Все марки', value: '' },
    },
    {
      name: 'cityId',
      options: filterList.cities,
      defaultOption: { label: 'Все города', value: '' },
    },
    {
      name: 'status',
      options: filterList.statuses,
      defaultOption: { label: 'Все статусы', value: '' },
    },
  ];
  const shouldShowNoResult = !Object.values(currentOrder ?? {}).length;

  return (
    <>
      {alert ? (
        <AdminAlert
          text="Успех, заказ сохранен!"
          closeAction={() => setAlert(false)}
        />
      ) : null}
      <h1 className="admin__heading">Заказы</h1>
      <div className="order-block">
        <div className="order-block__sort-container">
          <span onClick={createFilters} className="filter-icon"></span>
          <form className="order-block__sort-container__sort">
            {selectList.map(({ name, options, defaultOption }) => (
              <SelectFilter
                name={name}
                options={options}
                className="admin__select"
                onChange={filterHandler}
                key={name}
                defaultOption={defaultOption}
              />
            ))}
            <button
              onClick={() => {
                setPage(1);
                getOrderTable();
              }}
              className="admin__button blue"
              type="button"
            >
              Применить
            </button>
          </form>
        </div>
        {!isLoading && (
          <div className="order-block__info">
            {!shouldShowNoResult ? (
              <>
                <span className="order-block__info__part">
                  <img
                    crossOrigin="anonymous"
                    referrerPolicy="origin"
                    className="order-block__info__img"
                    src={currentOrder.carId?.thumbnail.path || fakeCar}
                    alt="car"
                  />
                  <p className="order-block__info__text">
                    <span>{currentOrder.carId?.name || 'МАРКА'}</span> в{' '}
                    <span>
                      {currentOrder.cityId?.name || 'Город'}{' '}
                      {currentOrder.pointId?.address || 'Улица'}
                    </span>{' '}
                    <br />
                    {new Date(currentOrder.dateFrom).toLocaleString('RU') ||
                      '01.01.2001 01:01'}{' '}
                    -{' '}
                    {new Date(currentOrder.dateTo).toLocaleString('RU') ||
                      '01.01.2001 01:01'}
                    <br />
                    Цвет: <span>{currentOrder.color || 'Белый'}</span>
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
                          checked={currentOrder[el.name]}
                          readOnly={true}
                        />
                        <br />
                      </Fragment>
                    ))}
                  </span>
                  <p className="order-block__info__cost">
                    {currentOrder.price || '00000'} ₽
                  </p>
                  <span className="order-block__info__buttons">
                    <button
                      onClick={doneCar}
                      className="order-block__info__buttons__ok"
                    >
                      <span>✔</span> Готово
                    </button>
                    <button
                      onClick={cancelCar}
                      className="order-block__info__buttons__cancel"
                    >
                      <span>✖</span> Отмена
                    </button>
                    <button
                      onClick={() => {
                        history.push(`/adminPanel/${currentOrder.id}`);
                      }}
                      className="order-block__info__buttons__edit"
                    >
                      <span>⁝</span> Изменить
                    </button>
                  </span>
                </span>
              </>
            ) : (
              'Заказы не найдены'
            )}
          </div>
        )}
        {countPages > 1 && !isLoading && (
          <AdminPagination
            paginationHandler={paginationHandler}
            setPage={setPage}
            page={page}
            countPages={countPages}
          />
        )}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
