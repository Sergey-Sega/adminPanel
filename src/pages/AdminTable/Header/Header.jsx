import React from 'react';
import dropdownIcon from '../../../assets/dropdown.png';
import person from './../../../assets/user-avatar.png';
import './style.scss';
export const Header = () => {
  return (
    <>
      <form className="searching-form">
        <span className="icon shape"></span>
        <input
          className="searching-form__input"
          type="text"
          name="search"
          placeholder="Поиск.."
        />
      </form>
      <div className="notifications-block">
        <span className="notifications-block__icon"></span>
        <span className="notifications-block__counter">2</span>
      </div>
      <div className="user-block">
        <img className="user-block__user-pic" src={person} />
        <p className="user-block__user-name">Admin</p>
        <img className="user-block__dropdown" src={dropdownIcon} />
      </div>
    </>
  );
};
