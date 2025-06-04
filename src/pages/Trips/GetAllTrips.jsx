import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetAllTrips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch('http://localhost:3000/trips', {
          method: 'GET',
          credentials: 'include', // send cookies if needed later
        });

        if (!res.ok) {
          throw new Error('Failed to fetch trips, or you do not travel much');
        }

        const data = await res.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTrips();
  }, []);

  const goToCreate = () => navigate('/trips/create');

  return (
    <div className="trip-list">
      <h2>Travel List</h2>
      <button onClick={goToCreate}>+ Add Trip</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {trips.length === 0 && !error && <p>No trips found.</p>}

      <ul>
        {trips.map(trip => (
          <li key={trip._id}>
            <strong>{trip.location}</strong><br />
            {trip.arrivalDate} → {trip.departureDate}<br />
            <button onClick={() => navigate(`/trips/${trip._id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}