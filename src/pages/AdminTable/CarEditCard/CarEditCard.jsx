/* eslint-disable max-len */
import React from 'react';
import './style.scss';
import fakeCar from '../../../assets/car.png';

export default class CarEditCard extends React.Component {
  constructor() {
    super();
    this.state = {
      model: '',
      type: '',
      colors: [],
      file: '',
      category: '',
      addColor: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addColor = this.addColor.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  addColor() {
    this.setState((prevState) => ({
      colors: [...prevState.colors, prevState.addColor],
      addColor: '',
    }));
  }

  render() {
    const procentes =
      +(this.state.model && 20) +
      +(this.state.type && 20) +
      +(this.state.colors.length && 20) +
      +(this.state.file && 20) +
      +(this.state.description && 20);
    return (
      <>
        <h1 className='admin__heading'>Карточка автомобиля</h1>
        <div className='car-edit__container'>
          <div className='car-edit__container__car-block'>
            <img
              crossOrigin='anonymous'
              referrerPolicy='origin'
              className='car-edit__container__car-block__img'
              src={fakeCar}
              alt='car'
            />
            <h2>{this.state.model || 'Название автомобиля'}</h2>
            <h3>{this.state.type || 'Тип автомобиля'}</h3>
            <form
              action=''
              className='car-edit__container__car-block__file-form'
            >
              <label className='admin__file-loader' htmlFor='fileLoader'>
                <span className='admin__file-loader__text'>
                  {this.state.file.name || 'Выберите файл...'}
                </span>
                <input
                  id='fileLoader'
                  type='file'
                  name='file'
                  accept='image/*'
                  required
                  onChange={(event) =>
                    this.setState({ file: event.target.files[0] })
                  }
                />
                <span className='admin__file-loader__button'>Обзор</span>
              </label>
            </form>
            <div className='car-edit__container__car-block__counter'>
              <p className='car-edit__container__car-block__counter__text'>
                Заполнено:
              </p>
              <p className='car-edit__container__car-block__counter__text'>
                {procentes || 0}%
              </p>
              <span
              className='car-edit__container__car-block__counter__container'>
                <span
                  style={{ width: `${procentes || 0}%` }}
                  className='car-edit__container__car-block__counter__container__line'
                ></span>
              </span>
            </div>
            <div className='car-edit__container__car-block__description'>
              <p className='car-edit__container__car-block__description__text'>
                Описание
              </p>
              <textarea
                className='admin__textarea'
                name='description'
                cols='30'
                rows='5'
                maxLength='196'
                placeholder='Введите описание автомобиля'
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className='car-edit__container__additional-block'>
            <form className='car-edit__container__additional-block__form'>
              <h2>Настройки автомобиля</h2>
              <span
              className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Модель автомобиля</legend>
                  <input
                    onChange={this.handleChange}
                    type='text'
                    className='admin__input'
                    name='model'
                    value={this.state.model}
                    placeholder='Введите модель автомобиля'
                  />
                </fieldset>
                <fieldset>
                  <legend>Тип автомобиля</legend>
                  <input
                    onChange={this.handleChange}
                    type='text'
                    className='admin__input'
                    name='type'
                    placeholder='Введите тип автомобиля'
                    value={this.state.type}
                  />
                </fieldset>
              </span>
              <span
              className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Класс автомобиля</legend>
                  <label className='admin__radio'>
                    <input type='radio' name='category' id='econom' />
                    <span>Эконом</span>
                  </label>
                  <label className='admin__radio'>
                    <input
                      type='radio'
                      name='category'
                      defaultChecked
                      id='premium'
                      onChange={this.handleChange}
                    />
                    <span>Премиум</span>
                  </label>
                </fieldset>
              </span>
              <span
               className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Доступные цвета</legend>
                  <span>
                    <input
                      type='text'
                      className='admin__input'
                      name='addColor'
                      placeholder='Введите цвет'
                      onChange={this.handleChange}
                      value={this.state.addColor}
                    />
                    <button
                      className='plus-btn'
                      type='button'
                      disabled={this.state.addColor ? false : true}
                      onClick={this.addColor}
                    >
                      <span></span>
                    </button>
                  </span>
                </fieldset>
                {this.state.colors.map((el) => (
                  <label className='checkbox__color' key={el}>
                    <input type='checkbox' readOnly checked />
                    <span>{el}</span>
                  </label>
                ))}
              </span>
            </form>
            <div className='car-edit__container__additional-block__btn-bar'>
              <span>
                <button className='admin__button blue'>Сохранить</button>
                <button className='admin__button gray'>Отменить</button>
              </span>
              <span>
                {' '}
                <button className='admin__button red'>Удалить</button>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
};
