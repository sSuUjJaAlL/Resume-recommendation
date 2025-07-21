const getObjectValue = (obj: object | any, key: string) => {
  return key in obj ? obj[key] : null;
};

export { getObjectValue };
