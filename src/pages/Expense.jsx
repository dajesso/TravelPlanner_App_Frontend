// Logic:
// Gets the current trip based on the tripId in the URL
// Fetch and display Trip details (location, dates, total expense) + List of all expenses for that trip
// Handles authorization using the JWT token from cookies.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseTable from '../components/ExpenseTable';
import { getToken } from '../utils/getToken';
import { deleteExpense, fetchData, loadExpensesByTrip } from '../utils/fetchApi';
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
  const loadTripAndExpenses = async () => {
    await fetchData(`http://localhost:3000/trips/${tripId}`, setTrip, "Failed to load trip", setError);
    await loadExpensesByTrip(tripId, setExpenses, setError);
  };

  const handleSaveExpense = async() => {
    // refresh the data from backend
    await loadTripAndExpenses();
    setEditingExpense(null);
    };

  // confirm actual deletion
  const confirmDelete = async (expenseId) => {
    const { ok, data } = await deleteExpense(expenseId);
    if (ok) {
      await loadTripAndExpenses();
      setExpenseToDelete(null);
    } else {
      alert("Failed to delete: " + data.error);
    }
  };

  useEffect(() => {
    loadTripAndExpenses();
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
              onEdit={(expense) => setEditingExpense(expense)}
              onDelete={(expense) => setExpenseToDelete(expense)}
            />
        </div>
      </>
    )}

    {editingExpense && (
      <ExpenseEditWindow
        expense={editingExpense}
        tripId={tripId}
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