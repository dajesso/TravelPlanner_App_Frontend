import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/getToken';
import { formatDateToDDMMYYYY } from '../../utils/formatDate';

export default function CreateTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    location: '',
    arrivalDate: '',
    departureDate: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setTrip(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Validation: arrival must be before departure
    if (new Date(trip.arrivalDate) >= new Date(trip.departureDate)) {
      setError('Arrival date must be before departure date');
      return;
    }

    const tripToSend = {
      ...trip,
      arrivalDate: formatDateToDDMMYYYY(trip.arrivalDate),
      departureDate: formatDateToDDMMYYYY(trip.departureDate)
    };

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripToSend)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Trip creation failed');
      }

      navigate('/trips');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <h2>Create a New Trip</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={trip.location}
          onChange={handleChange}
          required
        />

        <label>Arrival Date:</label>
        <input
          type="date"
          name="arrivalDate"
          value={trip.arrivalDate}
          onChange={handleChange}
          required
        />

        <label>Departure Date:</label>
        <input
          type="date"
          name="departureDate"
          value={trip.departureDate}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Trip'}
        </button>
      </form>
    </div>
  );
} 