
// Filter 'All Trips'
export function filterTripsBy(trips, { location, month, year }) {
  return trips.filter(trip => {
    const [_, arrivalMonth, arrivalYear] = trip.arrivalDate.split('/');
    const matchLocation = location
      ? trip.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchMonth = month ? arrivalMonth === month : true;
    const matchYear = year ? arrivalYear === year : true;
    return matchLocation && matchMonth && matchYear;
  });
}