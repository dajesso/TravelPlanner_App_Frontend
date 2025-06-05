import { filterTripsBy } from '../src/utils/filterTrips';

describe('filterTripsBy', () => {
  const trips = [
    { location: 'Bangkok', arrivalDate: '01/01/2025', departureDate: '06/01/2025' },
    { location: 'Nagasaki', arrivalDate: '02/02/2025', departureDate: '07/02/2025' },
    { location: 'Rome', arrivalDate: '03/03/2025', departureDate: '08/01/2025' }
  ];

  test('filters by location', () => {
    const filtered = filterTripsBy(trips, { location: 'bangkok', month: '', year: '' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].location).toBe('Bangkok');
  });

  test('filters by month', () => {
    const filtered = filterTripsBy(trips, { location: '', month: '01', year: '' });
    expect(filtered).toHaveLength(1);
  });

  test('filters by year', () => {
    const filtered = filterTripsBy(trips, { location: '', month: '', year: '2025' });
    expect(filtered).toHaveLength(3);
  });

  test('filter by location and month', () => {
    const filtered = filterTripsBy(trips, { location: 'rome', month: '03', year: '' });
    expect(filtered).toHaveLength(1);
  });

  test('filters by all fields', () => {
    const filtered = filterTripsBy(trips, { location: 'bangkok', month: '01', year: '2025' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].arrivalDate).toBe('01/01/2025');
  });
});