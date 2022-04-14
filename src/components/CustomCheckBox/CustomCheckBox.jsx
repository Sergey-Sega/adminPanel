import React from 'react';
import './style.scss';
export const CustomCheckbox = (props) => {
  const { name, value, description, action, checked } = props;
  return (
    <label className="checkbox__description">
      <input
        className="checkbox"
        type="checkbox"
        name={name}
        value={value}
        onChange={action}
        defaultChecked={checked}
      />
      <span>{description}</span>
    </label>
  );
};
