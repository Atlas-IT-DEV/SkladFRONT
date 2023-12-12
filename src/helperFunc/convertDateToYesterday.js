export const convertDateToYesterday = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDate = `${(day < 10 ? "0" : "") + day}.${
    (month < 10 ? "0" : "") + month
  }.${year}`;
  return formattedDate;
};
