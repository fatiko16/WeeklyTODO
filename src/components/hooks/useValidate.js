import { useState } from "react";

function useValidate(validate) {
  const [value, setValue] = useState("");
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
