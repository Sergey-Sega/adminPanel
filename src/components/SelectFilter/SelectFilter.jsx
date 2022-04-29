import React from 'react';

export const SelectFilter = ({
  name,
  options,
  onChange,
  className,
  defaultOption,
}) => (
  <select onChange={onChange} className={className} name={name}>
    <option value={defaultOption.value}>{defaultOption.label}</option>
    {options.map((el) => (
      <option key={el.id} value={el.id}>
        {el.name}
      </option>
    ))}
  </select>
);
