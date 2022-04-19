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
}) {
  return (
    <fieldset className='admin__fieldset'>
      <legend>{legend}</legend>
      <input
        onChange={onChange}
        type={!isNumber ? 'text' : 'number'}
        min={isNumber && '1'}
        className={`admin__input ${error ? 'error' : ''}`}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {error && <p className='admin__input__error-text'>{errorText}</p>}{' '}
    </fieldset>
  );
};
