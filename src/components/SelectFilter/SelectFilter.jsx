/* eslint-disable max-len */
import React from 'react';

export const SelectFilter = ({
  name,
  options,
  onChange,
  className,
  defaultOption,
  disabled,
}) => (
  <select onChange={onChange} className={className} name={name} disabled={disabled}>
    <option value={defaultOption.value}>{defaultOption.label}</option>
    {options.map((el) => (
      <option key={el.id} value={el.id}>
        {el.name}
      </option>
    ))}
  </select>
);
