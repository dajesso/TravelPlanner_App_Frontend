import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getToken } from '../../utils/getToken';
import { filterTripsBy } from '../../utils/filterTrips';
import DeleteTripConfirmation from '../../components/DeleteTripConfirmation';
import '../Trips.css';

// Fetch list of trips belonging to the logged in user
export default function GetAllTrips() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filters, setFilters] = useState({ location: '', month: '', year: '' });
  const [error, setError] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);

  const locationInputRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check ownership of trips using auth token
  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch('http://localhost:3000/trips', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        // Error handling for wrong token
        if (!res.ok) throw new Error('Failed to fetch trips');

        // Fetches data of trips
        const data = await res.json();
        setTrips(data);

        // Establish fields and filters
        const location = searchParams.get('location') || '';
        const month = searchParams.get('month') || '';
        const year = searchParams.get('year') || '';
        const initialFilters = { location, month, year };
        setFilters(initialFilters);

        // Apply filters to trips and error handling
        const initialFiltered = filterTripsBy(data, initialFilters);
        setFilteredTrips(initialFiltered);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTrips();
  }, []);

  // Handle filters depending on user input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    setSearchParams(updatedFilters);
    const filtered = filterTripsBy(trips, updatedFilters);
    setFilteredTrips(filtered);
  };

  // Clear filters and show 'All Trips' again
  const resetFilters = () => {
    const cleared = { location: '', month: '', year: '' };
    setFilters(cleared);
    setSearchParams(cleared);
    setFilteredTrips(trips);
    locationInputRef.current?.focus();
  };

  // Take user to the 'Create Trip' page
  const goToCreate = () => navigate('/trips/create');

  // Using token authorise user to delete trip
  const handleDelete = async (tripId) => {
    try {
      const res = await fetch(`http://localhost:3000/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      // Error handling for unauth user
      if (!res.ok) throw new Error('Failed to delete trip');

      // Filter trips, update list and reapply filters
      const updatedTrips = trips.filter(trip => trip._id !== tripId);
      setTrips(updatedTrips);
      setFilteredTrips(filterTripsBy(updatedTrips, filters));
      setTripToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Creates month options and formats months for dropdown
  const months = Array.from({ length: 12 }, (_, i) => {
    const val = String(i + 1).padStart(2, '0');
    return { label: val, value: val };
  });
  const years = ['2024', '2025', '2026', '2027'];


  return (
    <div className="trip-list">
      <h2>Travel List</h2>
      <div className="filter-and-add-container">
        <div className="filter-bar">
          <input
            ref={locationInputRef}
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />

          <select name="month" value={filters.month} onChange={handleFilterChange}>
            <option value="">Month</option>
            {months.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button onClick={resetFilters}>Clear All</button>
        </div>

        <button onClick={goToCreate}>+ Add Trip</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredTrips.length === 0 && !error && <p>No trips found.</p>}

      <div className="trip-grid">
        {filteredTrips.map(trip => (
          <div className="trip-card" key={trip._id}>
            <h3>{trip.location}</h3>
            <p>{trip.arrivalDate} → {trip.departureDate}</p>
            <p>Total: ${trip.totalExpense}</p>
            <div className="card-buttons">
              <button onClick={() => navigate(`/trips/${trip._id}`)}>View</button>
              <button onClick={() => setTripToDelete(trip)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {tripToDelete && (
        <DeleteTripConfirmation
          trip={tripToDelete}
          onCancel={() => setTripToDelete(null)}
          onConfirm={() => handleDelete(tripToDelete._id)}
        />
      )}
    </div>
  );
}