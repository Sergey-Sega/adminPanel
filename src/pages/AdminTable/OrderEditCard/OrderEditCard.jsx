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
import { CITIES, ORDER, ORDER_STATUS, POINTS } from '../../../service/urls';
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
  const [cities, setCities] = useState([]);
  const [points, setPoints] = useState([]);
  const [filterPoints, setFilterPoints] = useState([]);

  const orderStatusOptions = useMemo(()=>{
    return orderStatuses.map(({id, name})=> ({value: id, title: name}) );
  }, [orderStatuses]);

  const citiesOptions = useMemo(()=>{
    return cities.map(({id, name})=> ({value: id, title: name}) );
  }, [cities]);

  const pointsOptions = useMemo(()=>{
    return filterPoints.map(({id, name})=> ({value: id, title: name}) );
  }, [filterPoints]);

  useEffect(async () => {
    const res = await fetchData(`${ORDER}/${orderId}`).then((response) => {
      if (!response) {
        history.push('/adminPanel/errorpage');
      } else {
        const data = response.data;
        setOrder(response.data);
      }
    });
    const response = await fetchData(CITIES);
    const data = response.data;
    setCities(response.data);
  }, []);

  useEffect(async ()=>{
    const res = await fetchData(POINTS);
    const data = res.data;
    setPoints(data);
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
          text="??????????, ???????????????? ???????????? ??????????????????!"
          closeAction={() => setAlert(false)}
        />
      ) : null}
      <h1 className="admin__heading">???????????????? ????????????</h1>
      <div className="car-edit__container">
        <div className="car-edit__container__car-block">
          <img
            crossOrigin="anonymous"
            referrerPolicy="origin"
            className="car-edit__container__car-block__img"
            src={order.carId?.thumbnail.path || fakeCar}
            alt="car"
          />
          <h2>{order.carId?.name || '???????????????? ????????????????????'}</h2>
          <h3>{order.carId?.categoryId?.name || '?????? ????????????????????'}</h3>
          <div className="car-edit__container__car-block__description">
            <p className="car-edit__container__car-block__description__text">
              ????????????????
            </p>
            <textarea
             disabled
              className="admin__textarea"
              name="description"
              cols="30"
              rows="5"
              maxLength="196"
              placeholder="???????????????? ????????????????????"
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
            <h2>?????????????????? ????????????</h2>
            <span className="car-edit__container__additional-block__form__group">
            <CustomDropDown
                defaultValue={order.cityId?.name}
                placeholder="???????????????? ??????????"
                legend="?????????? (???????????????? ???? ????????????)*"
                options={citiesOptions}
                onChange={(value) => {
                  setFilterPoints([]);
                  setError(false);
                  const orderCityId = cities.find(({id}) => id === value);
                  if (orderCityId) {
                    setOrder({
                      ...order,
                      cityId: orderCityId,
                      pointId: undefined,
                    });
                    const result = points.filter(({cityId}) => cityId.id === orderCityId.id);
                    setFilterPoints(result);
                    if (!result.length) setError(true);
                  }
                }
              }
              />
              <CustomDropDown
                defaultValue={order.pointId?.name}
                placeholder="???????????????? ?????????? ????????????"
                legend="?????????? (???????????????? ???? ????????????)*"
                error={error}
                errorText='?????? ?????????????????? ?????????????? ????????????!!!'
                options={pointsOptions}
                onChange={(value) => {
                  const pointId = filterPoints.find(({id}) => id === value);
                  if (pointId) {
                    setOrder({
                      ...order,
                      pointId,
                    });
                  }
                }}
              />
               <CustomDropDown
                defaultValue={order.orderStatusId?.name}
                placeholder="???????????????? ???????????? ????????????"
                legend="???????????? ???????????? (???????????????? ???? ????????????)*"
                options={orderStatusOptions}
                onChange={(value) => {
                  const orderStatusId = orderStatuses.find(({id}) => id === value);
                  if (orderStatusId) {
                    setOrder({
                      ...order,
                      orderStatusId,
                    });
                  }
                }
              }
              />
            </span>
            <span className="car-edit__container__additional-block__form__group">
              <div className="car-edit__container__additional-block__form__group__price">
                <AdminInput
                  placeholder="?????????????? ??????????????????"
                  legend="?????????????????? ????????????"
                  onChange={handleChange('price')}
                  value={order.price ?? ''}
                  name="price"
                />
              </div>
            </span>
          </div>
          <div className="car-edit__container__additional-block__btn-bar">
            <span>
              <button onClick={editOrder} disabled={!order.cityId || !order.pointId || !order.orderStatusId} className="admin__button blue">
                ??????????????????
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
                ??????????????
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
