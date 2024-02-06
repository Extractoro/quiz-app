export const dateDifferenceInHours = (date) => {
  const currentDate = new Date();
  const millisecondsDiff = Math.abs(date.getTime() - currentDate.getTime());
  const hoursDiff = millisecondsDiff / (1000 * 60 * 60);
  return hoursDiff;
};
