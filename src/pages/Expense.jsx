// Logic:
// Gets the current trip based on the tripId in the URL
// Fetch and display Trip details (location, dates, total expense) + List of all expenses for that trip
// Handles authorization using the JWT token from cookies.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseTable from '../components/ExpenseTable';
import './Expense.css';
import ExpenseEditWindow from "../components/ExpenseEditWindow";
import ExpenseDeleteWindow from "../components/ExpenseDeleteWindow";

function Expense() {
  //  grabs the tripId from the URL
  const { tripId } = useParams();

  // Storing the follwing data
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Get the token
  // document.cookie gives all cookies, we need to find and get the token from it
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("sessionToken="))
    ?.split("=")[1];

  // hardcode token for manual testing:
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM3MWNmMDlhZGU0ZWUwNDc2OWFmNWQiLCJlbWFpbCI6IjEzQGdtYWlsLmNvbSIsImV4cCI6MTc0ODU4MTk4NywiaWF0IjoxNzQ4NTc4Mzg3fQ.VgNVCsP08TiBlrA-2lupfzdj_0Sa1E69J35VH-QV0O8"
  
  // Function to start editing a specific expense (opens the edit window)
  const handleEdit = (expense) => {
  setEditingExpense(expense); 
  } ;

  // Function to update the expense list after an expense is edited and saved
  const handleSaveEdit = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp))
    );
  };
  // handle delete click
  const handleDelete = (expense) => {
    setExpenseToDelete(expense);
  };

  // confirm actual deletion
  const confirmDelete = async (expenseId) => {
    try {
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("sessionToken="))
        ?.split("=")[1];

      const res = await fetch(`http://localhost:3000/expenses/${expenseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setExpenses(prev => prev.filter(exp => exp._id !== expenseId));
        setExpenseToDelete(null);
      } else {
        const data = await res.json();
        alert("Failed to delete: " + data.error);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

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
      console.error("Error fetching expenses:", err);
      setError("Failed to fetch expenses.");
    }
  };

  fetchTrip(),
  fetchExpenses();
}, [token, tripId]);


  return (
    <div>
      <h2>Trip Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!trip && !error && <p>Loading trip data...</p>}

      {trip ? (
      <div>
        <h2>Location: {trip.location}</h2>
        <p>Dates: {trip.arrivalDate} - {trip.departureDate}</p>
        <p>Total Expense: ${trip.totalExpense}</p>

        <h3>Expenses:</h3>
        <ExpenseTable
          expenses={expenses}
          onEdit={(expense) => handleEdit(expense)}
          onDelete={(expense) => handleDelete(expense)}
        />
      </div>
    ) : (
      !error && <p>Loading trip data...</p>
    )}

    {editingExpense && (
      <ExpenseEditWindow
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveEdit}
      />
    )}

    {expenseToDelete && (
      <ExpenseDeleteWindow
        expense={expenseToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setExpenseToDelete(null)}
      />
    )}
  </div>
);
}


export default Expense;