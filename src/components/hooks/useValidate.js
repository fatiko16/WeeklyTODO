import React, { useState } from "react";

function useValidate() {
  const [descriptionIsNotValid, setDescriptionIsNotValid] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const isDescriptionValid = descriptionText.length > 0;
  const descriptionChangedHandler = (valueRef) => {
    setDescriptionText(valueRef);
  };
  const descriptionTouchedHandler = () => {
    setIsDescriptionTouched(true);
  };
}

export default useValidate;
