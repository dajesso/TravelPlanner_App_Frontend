// Format input date
export function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}
