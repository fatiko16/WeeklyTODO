import { useState } from "react";

function useValidate(validate, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [isValueTouched, setIsValueTouched] = useState(false);
  const isValueValid = validate(value);

  const valueChangedHandler = (event) => {
    setValue(event.target.value);
  };

  const valueTouchedHandler = () => {
    setIsValueTouched(true);
  };

  return {
    value,
    isValueTouched,
    isValueValid,
    valueChangedHandler,
    valueTouchedHandler,
  };
}

export default useValidate;
