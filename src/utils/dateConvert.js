const dateConvert = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const event = new Date(date);
  return event.toLocaleDateString(undefined, options);
};

export default dateConvert;