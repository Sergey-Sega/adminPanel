import React from 'react';
import './style.scss';

export const AdminAlert = ({ text, closeAction }) => {
  return (
    <div className='admin__alert'>
      <p>✓ {text} </p>
      <button onClick={closeAction}>✖</button>
    </div>
  );
};
