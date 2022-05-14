/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useMemo, useEffect } from 'react';
import './style.scss';

export const CustomDropDown = ({
  options,
  placeholder,
  defaultValue,
  onChange,
  legend,
  error,
  errorText,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [inputValue, setInputValue] = useState(undefined);

  useEffect(() => {
    if (!defaultValue) {
      setInputValue('');
    } else {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter(({ title }) => title.includes(inputValue));
  }, [options, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSelect = (selectedValue) => {
    setInputValue(
      options.find(({ value }) => value === selectedValue)?.title || '',
    );
    onChange(selectedValue);
    setIsDropDownOpen(false);
  };

  return (
    <>
      <fieldset className="admin__fieldset">
        <legend>{legend}</legend>
        <div className="dropdown-wrap">
          <input
            value={inputValue ?? defaultValue}
            id="asd"
            type="text"
            error={error}
            className="textInput__dropdown"
            onChange={handleInputChange}
            onFocus={() => setIsDropDownOpen(true)}
            placeholder={placeholder}
            onBlur={() =>
              setTimeout(() => {
                setIsDropDownOpen(false);
              }, 100)
            }
          />
          <ul className={`dropdown ${isDropDownOpen ? 'open' : 'closed'}`}>
            {filteredOptions.map(({ value, title }) => (
              <li
                className="dropdown-item"
                onClick={(e) => {
                  onSelect(value);
                }}
                key={value}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
        {error && <p className='admin__input__error-text'>{errorText}</p>}
      </fieldset>
    </>
  );
};
