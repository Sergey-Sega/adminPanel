/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useMemo } from 'react';
import './style.scss';

export const CustomDropDown = ({ options, placeholder, defaultValue, onChange, legend}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [inputValue, setInputValue] = useState(()=>{
    if (defaultValue) {
      return options.find(({value}) => value === defaultValue)?.title || '';
    }
  });

  const filteredOptions = useMemo(()=> {
    if (!inputValue) return options;
    return options.filter(({title})=> title.includes(inputValue));
  }, [options, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSelect = (selectedValue) => {
    setInputValue(options.find(({value}) => value === selectedValue)?.title || '');
    onChange(selectedValue);
    setIsDropDownOpen(false);
  };

  return (
      <>
      <fieldset className='admin__fieldset'>
    <legend>{legend}</legend>
    <div className="dropdown-wrap">
      <input
        value={inputValue}
        id="asd"
        type="text"
        defaultValue={defaultValue}
        className="textInput__dropdown"
        onChange={handleInputChange}
        onFocus={()=> setIsDropDownOpen(true)}
        placeholder={placeholder}
        onBlur={()=>
          setTimeout(() => {
            setIsDropDownOpen(false);
          }, 100)
        }
      />
      <ul className={`dropdown ${isDropDownOpen ? 'open' : 'closed'}`}>
         {filteredOptions.map(({value, title}) => (
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
    </fieldset>
    </>
  );
};
