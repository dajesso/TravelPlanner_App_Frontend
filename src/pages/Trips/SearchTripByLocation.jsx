import { useState } from 'react';
import { getToken } from '../../utils/getToken';


export default function GetOneTrip() {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:3000/trips/search?location=${encodeURIComponent(location)}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Trips by Location</h1>

      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="flex-grow border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {results.map((trip) => (
          <li key={trip._id} className="border-b pb-2">
            <strong>{trip.location}</strong><br />
            {new Date(trip.arrivalDate).toLocaleDateString()} → {new Date(trip.departureDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}