const formatHour = (hour) => {
  const h = hour.split(":")[0];
  const m = hour.split(":")[1];
  return `${h}h${m}`;
};

export {formatHour};
