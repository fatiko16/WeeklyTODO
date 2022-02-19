export const validateByLength = (value) => {
  return value.length > 0;
};
export const validateByTime = (value) => {
  return parseInt(value) > 0 && parseInt(value) < 361;
};
