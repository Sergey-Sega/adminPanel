import React from 'react';
export default function AdminInput({
  legend,
  onChange,
  error,
  name,
  value,
  placeholder,
  errorText,
  isNumber,
  onBlur,
  list,
  disabled,
}) {
  return (
    <fieldset className='admin__fieldset'>
      <legend>{legend}</legend>
      <input
        disabled={disabled}
        list={list}
        onChange={onChange}
        type={!isNumber ? 'text' : 'number'}
        min={isNumber && '1'}
        className={`admin__input ${error ? 'error' : ''}`}
        name={name}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {error && <p className='admin__input__error-text'>{errorText}</p>}
    </fieldset>
  );
};
