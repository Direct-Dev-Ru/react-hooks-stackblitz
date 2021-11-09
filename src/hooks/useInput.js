import React, { useState } from 'react';

const defaultValidator = (newValue) => {
  return newValue.length > 0;
};

const useInput = ({ initial = '', required = false, validator }) => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(null);

  return {
    value,
    error,
    onChange: (e) => setValue(e.target.value),
    onBlur: (e) => {
      const newValue = e.target.value;
      console.log(newValue);
      if (newValue.length === 0 && required) {
        setError('Required field');
        e.target.focus();
      }
      if (validator) {
        const error = validator(newValue);
        console.log(error);
        if (error) {
          setError('Validation error: ' + error);
          e.target.focus();
        } else {
          setError(null);
          setValue(e.target.value);
        }
      }
    },
  };
};

export default useInput;
