// Logic:
// Gets the current trip based on the tripId in the URL
// Fetch and display Trip details (location, dates, total expense) + List of all expenses for that trip
// Handles authorization using the JWT token from cookies.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function Expense() {
  //  grabs the tripId from the URL
  const { tripId } = useParams();

  // Storing the follwing data
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  // Get the token
  // document.cookie gives all cookies, we need to find and get the token from it
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("sessionToken="))
    ?.split("=")[1];

  // hardcode token for manual testing:
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM3MWNmMDlhZGU0ZWUwNDc2OWFmNWQiLCJlbWFpbCI6IjEzQGdtYWlsLmNvbSIsImV4cCI6MTc0ODU4MTk4NywiaWF0IjoxNzQ4NTc4Mzg3fQ.VgNVCsP08TiBlrA-2lupfzdj_0Sa1E69J35VH-QV0O8"
  
  

  useEffect(() => {
  // Need get One Trip data to show the detail on the top of the page
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://localhost:3000/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setTrip(data);
        } else {
          setError(data.error || "Failed to load trip data");
        }
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError("Network error while fetching trip data");
      }
    };

    const fetchExpenses = async () => {
    try {
      const res = await fetch(`http://localhost:3000/expenses?trip=${tripId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setExpenses(data)
      } else {
        setError(data.error);}
    } catch (err) {
      setError("Failed to fetch expenses.");
    }
  };

  fetchTrip(),
  fetchExpenses();
}, [tripId]);

  return (
    <div>
      <h1>Trip Expenses for Trip ID: {tripId}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {trip ? (
        <div>
          <h2>Location: {trip.location}</h2>
          <p>
            Dates: {trip.arrivalDate} - {trip.departureDate}
          </p>
          <p>Total Expense: ${trip.totalExpense}</p>

          <h3>Expenses:</h3>
            {expenses.map(exp => (
              <div key={exp._id}>
                <p> {exp.category?.name}-{exp.description} - ${exp.amount}</p>
              </div>
      ))}
          
        </div>
      ) : (
        !error && <p>Loading trip data...</p>
      )}
    </div>
  );
}


export default Expense;