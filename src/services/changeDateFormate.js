export function changeDateFormat(dateString) {
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleString();
  return formattedDate;
}
