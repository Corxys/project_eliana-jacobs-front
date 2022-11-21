const formatHour = (hour) => {
  const h = hour.split(":")[0];
  const m = hour.split(":")[1];
  console.log("Hour", h, "Minutes", m);
  return `${h}h${m}`;
};

export {formatHour};
