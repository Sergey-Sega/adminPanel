/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import fakeCar from '../../../assets/car.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCar, setCarEdit } from '../../../store/actions/carEditActions';
import { useParams } from 'react-router-dom';
import {
  createData,
  deleteData,
  fetchData,
  putData,
} from '../../../service/getData';
import AdminInput from '../../../components/AdminInput/AdmitInput';
import { CARS, CATEGORIES } from '../../../service/urls';
import { convertBase64 } from '../../../hooks/imageHook';
import { AdminAlert } from '../../../components/AdminAlert/AdminAlert';
import { useLocation, useHistory } from 'react-router-dom';

const initialState = {
  priceMax: 50000,
  priceMin: 0,
  name: '',
  thumbnail: {
    path: undefined,
    size: undefined,
    originalname: undefined,
    mimetype: undefined,
  },
  description: '',
  categoryId: {
    name: '',
    id: '',
    description: '',
  },
  colors: [],
  tank: 100,
  number: '',
};

export const CarEditCard = () => {
  const {push} = useHistory();
  const location = useLocation();
  const { carId } = useParams();
  const [alert, setAlert] = useState(false);
  const carData = useSelector(({ carEdit }) => carEdit.data);
  const [procentes, setProcentes] = useState(0);
  const [category, setCategory] = useState([]);
  const colorRef = useRef();
  const [error, setError] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    setProcentes(
      +(state.name && 15) +
        +(state.categoryId?.name && 15) +
        +(state.colors?.length && 15) +
        +(!!state.thumbnail?.path && 15) +
        +(state.description && 25) +
        +(state.priceMax && 15),
    );
  }, [
    state.name,
    state.categoryId?.name,
    state.colors?.length,
    state.thumbnail?.path,
    state.description,
    state.priceMax,
  ]);

  useEffect(async () => {
    const res = await fetchData(CATEGORIES);
    const data = setCategory(res.data);
  }, []);

  useEffect(() => {
    if (carId) {
      dispatch(fetchCar(carId));
    }
  }, [carId]);

  useEffect(
    () => () => {
      setState(initialState);
      dispatch(setCarEdit({}));
    },
    [location.pathname],
  );

  useEffect(() => {
    if (Object.values(carData).length !== 0) setState(carData);
  }, [carData]);

  const clearState = () => {
    setState(carData ?? initialState);
  };


  const handleChange = useCallback(
    (prop) => (event) => {
      setState((values) => ({ ...values, [prop]: event?.target.value }));
    },
    [setState],
  );

  const addColor = (color) => {
    setState((prevState) => ({
      ...prevState,
      colors: prevState.colors ? [...prevState.colors, color] : [color],
    }));
  };

  const removeColor = (e) => {
    console.log(e.currentTarget.dataset.value);
    const newColors = e.currentTarget.dataset.value ? state.colors.filter((color)=> color !== e.currentTarget.dataset.value) : [];
    setState((state) => ({ ...state, colors: newColors }));
  };

  const createCar = () => {
    if (Object.values(carData).length !== 0) {
      const showError = category.every((el)=> el.name !== state.categoryId.name);
      setError(showError);
      putData(`db/car/${carId}`, state).then(() => setAlert(true));
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      const showError = category.every((el)=> el.name !== state.categoryId.name);
      setError(showError);
      if (showError) throw new Error('Скорректируйте карточку машины');
      createData(CARS, state)
        .then(() => setAlert(true))
        .then(() => {
          clearState();
        })
        .catch((err) => {
          history.push('/adminPanel/errorpage');
          console.error('ERROR', err);
        });
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setState({
      ...state,
      thumbnail: {
        ...state.thumbnail,
        path: base64,
        size: file.size,
        mimetype: file.type,
        originalname: file.name,
      },
    });
  };

  const setCategoryId = () => {
    const categoryId = category.find((el) => state.categoryId.name===el.name)?.id;
    const description = category.find((el) => state.categoryId.name===el.name)?.description;
                      if (categoryId) {
    setState((prevState) =>({
                        ...prevState,
                        categoryId: { ...prevState.categoryId, id: categoryId, description },
                      }));
    }
  };

  return (
    <>
      {alert ? (
        <AdminAlert
          text="Успех, машина сохранена!"
          // closeAction={() => setAlert(false)}
        />
      ) : null}
      <h1 className="admin__heading">Карточка автомобиля</h1>
      <div className="car-edit__container">
        <div className="car-edit__container__car-block">
          <img
            crossOrigin="anonymous"
            referrerPolicy="origin"
            className="car-edit__container__car-block__img"
            src={state.thumbnail?.path || fakeCar}
            alt="car"
          />
          <h2>{state.name || 'Название автомобиля'}</h2>
          <h3>{state.categoryId?.name || 'Тип автомобиля'}</h3>
          <form action="" className="car-edit__container__car-block__file-form">
            <label className="admin__file-loader" htmlFor="fileLoader">
              <span className="admin__file-loader__text">Выберите файл...</span>
              <input
                id="fileLoader"
                type="file"
                name="path"
                accept="image/*"
                required
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              <span className="admin__file-loader__button">Обзор</span>
            </label>
          </form>
          <div className="car-edit__container__car-block__counter">
            <p className="car-edit__container__car-block__counter__text">
              Заполнено:
            </p>
            <p className="car-edit__container__car-block__counter__text">
              {procentes || 0}%
            </p>
            <span className="car-edit__container__car-block__counter__container">
              <span
                style={{ width: `${procentes || 0}%` }}
                className="car-edit__container__car-block__counter__container__line"
              ></span>
            </span>
          </div>
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
              value={state.description}
              onChange={handleChange('description')}
            />
          </div>
        </div>
        <div className="car-edit__container__additional-block">
          <div className="car-edit__container__additional-block__form">
            <h2>Настройки автомобиля</h2>
            <span className="car-edit__container__additional-block__form__group">
              <AdminInput
                placeholder="Введите модель автомобиля"
                legend="Модель автомобиля"
                onChange={handleChange('name')}
                value={state.name ?? ''}
                name="name"
              />
              <AdminInput
                placeholder="Введите тип автомобиля"
                legend="Тип автомобиля"
                onBlur={setCategoryId}
                error={error}
                errorText='Некорректный тип автомобиля, выберите из существующих например, Спорт, Люкс, Эконом+'
                onChange={(e) =>
                  setState({
                    ...state,
                    categoryId: { ...state.categoryId, name: e.target.value },
                  })
                }
                value={state.categoryId?.name ?? ''}
                name="type"
              />
            </span>
            <span className="car-edit__container__additional-block__form__group">
              <div className="car-edit__container__additional-block__form__group__price">
                <AdminInput
                  placeholder="Введите стоимость"
                  legend="Минимальная стоимость аренды"
                  onChange={handleChange('priceMin')}
                  value={state.priceMin ?? ''}
                  name="priceMin"
                />
                <AdminInput
                  placeholder="Введите стоимость"
                  legend="Максимальная стоимость аренды"
                  onChange={handleChange('priceMax')}
                  value={state.priceMax ?? ''}
                  name="priceMax"
                />
              </div>
              <AdminInput
                placeholder="Введите номер автомобиля"
                legend="Номер автомобиля"
                onChange={handleChange('number')}
                value={state.number ?? ''}
                name="number"
              />
              <fieldset>
                <legend>Доступные цвета</legend>
                <span>
                  <input
                    type="text"
                    className="admin__input"
                    placeholder="Введите цвет"
                    ref={colorRef}
                  />
                  <button
                    className="plus-btn"
                    type="button"
                    onClick={() => {
                      addColor(colorRef.current.value);
                      colorRef.current.value = '';
                    }}
                  >
                    <span></span>
                  </button>
                </span>
              </fieldset>
              {state.colors?.map((el) => (
                <label className="checkbox__color" key={el}>
                  <input type="checkbox" readOnly checked />
                  <span data-value={el} onClick={removeColor}>{el}</span>
                </label>
              ))}
            </span>
          </div>
          <div className="car-edit__container__additional-block__btn-bar">
            <span>
              <button className="admin__button blue" onClick={createCar} disabled={procentes !== 100}>
                Сохранить
              </button>
              <button className="admin__button gray" onClick={clearState}>
                Отменить
              </button>
            </span>
            <span>
              {' '}
              <button
                className="admin__button red"
                disabled={!carId}
                onClick={() => {
                  deleteData(`${CARS}/${carId}`);
                  push('/car-list');
                }}
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
