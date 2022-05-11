/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './style.scss';
import fakeCar from '../../../assets/car.png';
import { useParams } from 'react-router-dom';
import { deleteData, fetchData, putData } from '../../../service/getData';
import AdminInput from '../../../components/AdminInput/AdmitInput';
import { ORDER, ORDER_STATUS } from '../../../service/urls';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';
import { useHistory } from 'react-router-dom';
import { CustomCheckbox } from '../../../components/CustomCheckBox/CustomCheckBox';

export const OrderEditCard = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const { orderId } = useParams();
  const [alert, setAlert] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const options = [
    { name: 'isFullTank', description: 'Полный бак' },
    { name: 'isNeedChildChair', description: 'Детское кресло' },
    { name: 'isRightWheel', description: 'Правый руль' },
  ];

  useEffect(async () => {
    const res = await fetchData(`${ORDER}/${orderId}`).then((response) => {
      if (!response) {
        history.push('/adminPanel/errorpage');
      } else {
        const data = response.data;
        setOrder(response.data);
      }
    });
  }, []);

  useEffect(async () => {
    const res = await fetchData(ORDER_STATUS);
    setOrderStatuses(res.data);
  }, []);

  const handleChange = useCallback(
    (prop) => (event) => {
      setOrder((values) => ({ ...values, [prop]: event?.target.value }));
    },
    [setOrder],
  );

  const editOrder = () => {
    const showError = orderStatuses.every(
      (el) => el.name !== order.orderStatusId?.name,
    );
    setError(showError);
    if (showError) throw new Error('Скорректируйте карточку заказа');
    putData(`${ORDER}/${orderId}`, order).then((response) => {
      if (!response) {
        history.push('/adminPanel/errorpage');
      } else {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      }
    });
  };

  const setOptions = (value) => {
    const index = options.find((elem) => elem.name === value);

    if (index != 1) {
      options.splice(index, 1);
    } else {
      order.push(value);
    }

    if (order.isFullTank) {
      setOrder({ ...order, isFullTank: false });
    }
    if (order.isNeedChildChair) {
      setOrder({ ...order, isNeedChildChair: false });
    }
    if (order.isRightWheel) {
      setOrder({ ...order, isRightWheel: false });
    }
    if (!order.isFullTank) {
      setOrder({ ...order, isFullTank: true });
    }
    if (!order.isNeedChildChair) {
      setOrder({ ...order, isNeedChildChair: true });
    }
    if (!order.isRightWheel) {
      setOrder({ ...order, isRightWheel: true });
    }
  };

  const setOrderStatusId = () => {
    const orderStatusId = orderStatuses.find(
      (el) => order.orderStatusId.name === el.name,
    )?.id;
    const nameOrder = orderStatuses.find(
      (el) => order.orderStatusId.name === el.name,
    )?.name;
    if (orderStatusId) {
      setOrder((prevState) => ({
        ...prevState,
        orderStatusId: {
          ...prevState.orderStatusId,
          id: orderStatusId,
          nameOrder,
        },
      }));
    }
  };

  return (
    <>
      {alert ? (
        <AdminAlert
          text="Успех, машина сохранена!"
          closeAction={() => setAlert(false)}
        />
      ) : null}
      <h1 className="admin__heading">Карточка заказа</h1>
      <div className="car-edit__container">
        <div className="car-edit__container__car-block">
          <img
            crossOrigin="anonymous"
            referrerPolicy="origin"
            className="car-edit__container__car-block__img"
            src={order.carId?.thumbnail.path || fakeCar}
            alt="car"
          />
          <h2>{order.carId?.name || 'Название автомобиля'}</h2>
          <h3>{order.carId?.categoryId.name || 'Тип автомобиля'}</h3>
          <div className="car-edit__container__car-block__description">
            <p className="car-edit__container__car-block__description__text">
              Описание
            </p>
            <textarea
              className="admin__textarea"
              name="description"
              cols="30"
              rows="5"
              maxLength="196"
              placeholder="Введите описание автомобиля"
              value={order.carId?.description}
              onChange={(e) =>
                setOrder({
                  ...order,
                  carId: { ...order.carId, description: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="car-edit__container__additional-block">
          <div className="car-edit__container__additional-block__form">
            <h2>Настройки заказа</h2>
            <span className="car-edit__container__additional-block__form__group">
              <AdminInput
                placeholder="Кол-во бензина в баке в %"
                legend="Бензина в баке в %"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    carId: { ...order.carId, tank: e.target.value },
                  })
                }
                errorText="Некорректная модель автомобиля"
                value={order.carId?.tank ?? ''}
                name="name"
              />
              <AdminInput
                legend="Статус заказа"
                error={error}
                onBlur={setOrderStatusId}
                errorText="Некорректный статус, выберите из существующих"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    orderStatusId: {
                      ...order.orderStatusId,
                      name: e.target.value,
                    },
                  })
                }
                value={order.orderStatusId?.name ?? ''}
                name="name"
                list="type"
              />
              <datalist id="type">
                {orderStatuses
                  ? orderStatuses.map((el) => {
                      return (
                        <option key={el.id} value={el.name} id={el.id}>
                          {el.name}
                        </option>
                      );
                    })
                  : null}
              </datalist>
            </span>
            <span className="order-edit__info__chechboxes">
              {options.map((el, i) => (
                <Fragment key={i}>
                  <CustomCheckbox
                    type="checkbox"
                    description={el.description}
                    name={el.name}
                    action={(e) => setOptions(e.target.value)}
                    checked={order[el.name]}
                    readOnly={true}
                  />
                  <br />
                </Fragment>
              ))}
            </span>
            <span className="car-edit__container__additional-block__form__group">
              <div className="car-edit__container__additional-block__form__group__price">
                <AdminInput
                  placeholder="Введите стоимость"
                  legend="Стоимость заказа"
                  onChange={handleChange('price')}
                  value={order.price ?? ''}
                  name="price"
                />
              </div>
              <AdminInput
                placeholder="Введите номер автомобиля"
                legend="Номер автомобиля"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    carId: { ...order.carId, number: e.target.value },
                  })
                }
                value={order.carId?.number ?? ''}
                name="number"
              />
            </span>
          </div>
          <div className="car-edit__container__additional-block__btn-bar">
            <span>
              <button onClick={editOrder} className="admin__button blue">
                Сохранить
              </button>
            </span>
            <span>
              {' '}
              <button
                onClick={() => {
                  deleteData(`${ORDER}/${orderId}`);
                  history.push('/adminPanel/orders');
                }}
                className="admin__button red"
              >
                Удалить
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
