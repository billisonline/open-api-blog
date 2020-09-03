import {useState, ChangeEvent} from "react";

const useBooleanState = (initial) => {
  const [value, setValue] = useState(initial);

  return [value, () => setValue(true), () => setValue(false)];
}

const useFormValue = (initial='') => {
  const [value, setValue] = useState(initial);

  /**
   * @param {ChangeEvent} event
   */
  const updateValue = (event) => {
    setValue(event.target.value);
  };

  return [value, updateValue];
}

export {useBooleanState, useFormValue}