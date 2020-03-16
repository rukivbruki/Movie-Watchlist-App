export const getDateWithFullMonth = (stringDate) => {
  if (typeof stringDate !== `string`) {
    throw new Error(`Invalid type of ${stringDate}`);
  }

  const date = new Date(stringDate);
  const month = date.toLocaleString(`en-EN`, {month: `long`});
  const result = `${month} ${date.getDate()}, ${date.getFullYear()}`;

  return result;
};

export const getDate = (stringDate) => {
  if (typeof stringDate !== `string`) {
    throw new Error(`Invalid type of ${stringDate}`);
  }

  const date = new Date(stringDate);
  const result = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  return result;
};
