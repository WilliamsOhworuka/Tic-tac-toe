/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef } from 'react';
import PropType from 'prop-types';
import './Dropdown.scss';

const Dropdown = ({
  defaultValue, setState, options, type, id,
}) => {
  const intervalRef = useRef();

  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleClick = () => {
    setActive(((prevState) => !prevState));
  };

  const handleBlur = () => {
    const timerId = setTimeout(() => setActive(false));
    intervalRef.current = timerId;
  };

  const handleFocus = () => {
    clearTimeout(intervalRef.current);
  };

  const handleSelect = (e) => {
    setValue(e.target.innerText);
    setState(type, e.target.value);
    setActive(false);
  };

  return (
    <div tabIndex="0" className="drop-container" onFocus={handleFocus} onBlur={handleBlur} id={id}>
      <label htmlFor="drop-down">{type}</label>
      <div tabIndex="0" className="drop" id="dropdown" role="presentation" data-testid={type} onClick={handleClick}>
        {value}
        <div>
          <i className="fas fa-angle-down" />
        </div>
      </div>
      {active ? (
        <ul className="options">
          {options.map((option) => (
            <li
              role="presentation"
              value={option.value}
              onClick={handleSelect}
              data-testid={option.text}
            >
              {option.text}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Dropdown.propTypes = {
  defaultValue: PropType.string.isRequired,
  setState: PropType.func.isRequired,
  options: PropType.arrayOf(PropType.object).isRequired,
  type: PropType.string.isRequired,
  id: PropType.string.isRequired,
};

export default Dropdown;
