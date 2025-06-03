// Logic:
// Gets the current trip based on the tripId in the URL
// Fetch and display Trip details (location, dates, total expense) + List of all expenses for that trip
// Handles authorization using the JWT token from cookies.

import React, { useEffect, useState } from "react";

// useParams allows us to grab the tripId from the URL
import { useParams } from "react-router-dom";

// Import custom components and styles
import ExpenseTable from '../components/ExpenseTable';
import ExpenseEditWindow from "../components/ExpenseEditWindow";
import ExpenseDeleteWindow from "../components/ExpenseDeleteWindow";
import './Expense.css';

// Import utility functions
import { deleteExpense, fetchData, loadExpensesByTrip } from '../utils/fetchApi';


function Expense() {
  //  grabs the tripId from the URL
  const { tripId } = useParams();

  // Storing the follwing data
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Load trip and associated expenses from backend
  const loadTripAndExpenses = async () => {

    // Fetch Trip Details
    await fetchData(`http://localhost:3000/trips/${tripId}`, setTrip, "Failed to load trip", setError);
    // Fetch all expenses related to the trip
    await loadExpensesByTrip(tripId, setExpenses, setError);
  };

  // Called after saving an expense to refresh the list
  const handleSaveExpense = async() => {

    // Refresh the data from backend
    await loadTripAndExpenses();
    // Close the edit modal
    setEditingExpense(null);
    };

  // confirm actual deletion
  const confirmDelete = async (expenseId) => {

    // Attempt to delete the expense
    const { ok, data } = await deleteExpense(expenseId);

    if (ok) {

      // Refresh data
      await loadTripAndExpenses();
      // Close the modal
      setExpenseToDelete(null);

    } else {
      alert("Failed to delete: " + data.error);
    }
  };

  // Load trip and expenses when component mounts or tripId changes
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
              // Pass expenses data to table
              expenses={expenses}
              // Open edit modal
              onEdit={(expense) => setEditingExpense(expense)}
              // Open delete modal
              onDelete={(expense) => setExpenseToDelete(expense)}
            />
        </div>
      </>
    )}

    {editingExpense && (
      <ExpenseEditWindow
        // Current expense being edited or added
        expense={editingExpense}
        // Needed for new expenses
        tripId={tripId}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveExpense}
      />
    )}

    {expenseToDelete && (
      <ExpenseDeleteWindow
        // Expense to delete
        expense={expenseToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setExpenseToDelete(null)}
      />
    )}
  </div>
);
}


export default Expense;