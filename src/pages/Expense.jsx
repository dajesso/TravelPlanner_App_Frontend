// Logic:
// Gets the current trip based on the tripId in the URL
// Fetch and display Trip details (location, dates, total expense) + List of all expenses for that trip
// Handles authorization using the JWT token from cookies.

import React, { useEffect, useState } from "react";

// useParams allows us to grab the tripId from the URL
import { useNavigate, useParams } from "react-router-dom";

// Import custom components and styles
import ExpenseTable from '../components/ExpenseTable';
import ExpenseEditWindow from "../components/ExpenseEditWindow";
import ExpenseDeleteWindow from "../components/ExpenseDeleteWindow";
import './Expense.css';

// Import utility functions
import { deleteExpense, fetchData, loadExpensesByTrip } from '../utils/fetchApi';
import TripEditWindow from "../components/TripEditWindow";

function Expense() {
  //  grabs the tripId from the URL
  const { tripId } = useParams();

  // Storing the follwing data
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  const [sortOption, setSortOption] = useState("");

  const [backendError, setBackendError] = useState("");


  const navigate = useNavigate();

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
      setBackendError("Failed to delete: " + data.error);
    }
  };

  // Load trip and expenses when component mounts or tripId changes
  useEffect(() => {
    loadTripAndExpenses();
  }, [tripId]);

  // Sort by...
  const sortedExpenses = [...expenses];

  if (sortOption === "price-low-high") {
    sortedExpenses.sort((a, b) => a.amount - b.amount);
  } else if (sortOption === "category-az") {
    sortedExpenses.sort((a, b) => {
      const nameA = a.category?.name?.toLowerCase() || "";
      const nameB = b.category?.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    });
  }

  return (
    <div className="page-container">
      {backendError && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}>
          {backendError}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!trip && !error && <p>Loading trip data...</p>}

      {trip && (
        <>
          <div className="top-row">

            <button className="back-button" onClick={() => navigate("/trips")}>
              ← All Trips
            </button>

            <h2>Trip Details</h2>

            <button onClick={() => setEditingTrip(trip)}>
              Edit Trip
            </button>
          </div>

          <div className="trip-info">
            <h2>Location: {trip.location}</h2>
            <p>Dates: {trip.arrivalDate} - {trip.departureDate}</p>
            <p>Total Expense: ${trip.totalExpense}</p>
          </div>

          <div className="table-header-row">
            <div className="sort-dropdown">
              <label htmlFor="sort">Sort By: </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="category-az">Category A → Z</option>
              </select>
            </div>

            <div className="add-expense-container">
              <button onClick={() => setEditingExpense({})}>
                + Add Expense
              </button>
            </div>
          </div>

          <div className="expense-table-container">
            <h3>Expenses:</h3>
            <ExpenseTable
              // Pass expenses data to table
              expenses={sortedExpenses}
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
        expenses={expenses}
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

    {editingTrip && (
      <TripEditWindow
        trip={editingTrip}
        onClose={() => setEditingTrip(null)}
        onSave={async () => {
          await loadTripAndExpenses();  
          setEditingTrip(null);         
        }}
      />
    )}
  </div>
);
}

export default Expense;