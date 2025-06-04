import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from '../utils/getToken';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  const loadTrips = async () => {
    try {
      const res = await fetch("http://localhost:3000/trips", {
        headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to load trips");
      }

      const data = await res.json();
      setTrips(data);
    } catch (err) {
      console.error("Error loading trips:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Trips</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {trips.length === 0 && !error && <p>Loading trips...</p>}

      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            <Link to={`/trips/${trip._id}`}>
              {trip.location} | {trip.arrivalDate} - {trip.departureDate} | Total: ${trip.totalExpense}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;