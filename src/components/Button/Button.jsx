import React from 'react';
import './style.scss';
export default function Button({ title, type, action }) {
  return (
    <button type='button'
    className={'button ' + type}
    onClick ={action}
    >
      {title}
    </button>
  );
};
