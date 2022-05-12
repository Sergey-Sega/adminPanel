/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
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
import { CustomDropDown } from '../../../components/CustomDropDown/CustomDropDown';

export const OrderEditCard = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const { orderId } = useParams();
  const [alert, setAlert] = useState(false);
  const [order, setOrder] = useState({});
  const [orderStatuses, setOrderStatuses] = useState([]);

  const orderStatusOptions = useMemo(()=>{
    return orderStatuses.map(({id, name})=> ({value: id, title: name}) );
  }, [orderStatuses]);

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

  return (
    <>
      {alert ? (
        <AdminAlert
          text="Успех, карточка заказа сохранена!"
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
          <h3>{order.carId?.categoryId?.name || 'Тип автомобиля'}</h3>
          <div className="car-edit__container__car-block__description">
            <p className="car-edit__container__car-block__description__text">
              Описание
            </p>
            <textarea
             disabled
              className="admin__textarea"
              name="description"
              cols="30"
              rows="5"
              maxLength="196"
              placeholder="Введите описание автомобиля"
              value={order.carId?.description ?? ''}
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
              disabled
                placeholder="Кол-во бензина в баке в %"
                legend="Бензина в баке в %"
                value={order.carId?.tank ?? ''}
                name="name"
              />
               <CustomDropDown
                defaultValue={order.orderStatusId?.name}
                placeholder="Выберите статус заказа"
                legend="Статус заказа (Выберите из списка)*"
                options={orderStatusOptions}
                onChange={(value) => {
                  const orderStatusId = orderStatuses.find(({id}) => id === value);
                  if (orderStatusId) {
                    setOrder({
                      ...order,
                      orderStatusId,
                    });
                  }
                }}
              />
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
               disabled
                placeholder="Введите номер автомобиля"
                legend="Номер автомобиля"
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
