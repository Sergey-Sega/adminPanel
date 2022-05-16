import React from 'react';
import Button from '../Button/Button';
import './style.scss';

export const Warning = ({closeAction, warningText}) => {
  return (
    <div
    className={`warning active`}>
      <div className='warning__btns-block'>
        <h1 className='warning__btns-block__head'>
          {warningText}
        </h1>
        <span>
          <Button
            action={closeAction}
            title='Вернуться'
            type='warn-btn blue-btn'
          />
        </span>
      </div>
    </div>
  );
};
