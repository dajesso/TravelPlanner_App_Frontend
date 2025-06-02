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
  const getToken = () =>
    document.cookie
    .split("; ")
    .find(row => row.startsWith("sessionToken="))
    ?.split("=")[1];

  const fetchData = async (url, setter, errorMsg) => {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) setter(data);
      else setError(data.error || errorMsg);
    } catch (err) {
      setError(errorMsg);
      console.error(errorMsg, err);
    }
  };

  // Function to start editing a specific expense (opens the edit window)
  const handleEdit = (expense) => {
  setSavedExpense(expense); 
  } ;

  // Function to update the expense list after an expense is edited and saved
  const handleSaveExpense = (savedExpense) => {
    setExpenses(prev => {
      const exists = prev.find(exp => exp._id === savedExpense._id);
      return exists
        ? prev.map(exp => (exp._id === savedExpense._id ? savedExpense : exp))
        : [...prev, savedExpense];
    });
  };
  
  // handle delete click
  const handleDelete = (expense) => {
    setExpenseToDelete(expense);
  };

  // confirm actual deletion
  const confirmDelete = async (expenseId) => {
    try {
      const res = await fetch(`http://localhost:3000/expenses/${expenseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken}` },
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
  // fetch trip
    fetchData(
      `http://localhost:3000/trips/${tripId}`,
      setTrip,
      "Failed to load trip data"
    );
  // fetch expense
    fetchData(
      `http://localhost:3000/expenses?trip=${tripId}`,
      setExpenses,
      "Failed to fetch expenses."
    );
  }, [tripId]);

  return (
    <div>
      <h2>Trip Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!trip && !error && <p>Loading trip data...</p>}

      {trip && (
        <>
          <div>
            <h2>Location: {trip.location}</h2>
            <p>Dates: {trip.arrivalDate} - {trip.departureDate}</p>
            <p>Total Expense: ${trip.totalExpense}</p>

            <button onClick={() => setEditingExpense({})}>
              + Add Expense
            </button>

            <h3>Expenses:</h3>
            <ExpenseTable
              expenses={expenses}
              onEdit={(expense) => handleEdit(expense)}
              onDelete={(expense) => handleDelete(expense)}
            />
      </div>
      </>
    )}

    {editingExpense && (
      <ExpenseEditWindow
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveExpense}
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