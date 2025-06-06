import { getToken } from './getToken';

// Generic fetcher
// Generic function to fetch data from an API endpoint
// - url: the endpoint to fetch
// - setter: a state setter function to store the result
// - errorMsg: fallback message if something goes wrong
// - setError: optional custom error handler (defaults to console.error)
export const fetchData = async (url, setter, errorMsg, setError = console.error) => {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    // Parse the JSON response
    const data = await res.json();

    // If request succeeded, update state using the provided setter
    if (res.ok) setter(data);

    // else, use the error setter (or console.error) to report the issue
    else setError(data.error || errorMsg);

  } catch (err) {
    setError(errorMsg);
    console.error(errorMsg, err);
  }
};

// Function to load all expenses tied to a specific trip
// - tripId: the ID of the trip to query
// - setExpenses: state setter to store returned expense list
// - setError: state setter to display error message if failed
export const loadExpensesByTrip = async (tripId, setExpenses, setError) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expenses?trip=${tripId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await res.json();

    // If successful, update expenses
    if (res.ok) setExpenses(data);
    // Otherwise, show error
    else setError(data.error || "Failed to load expenses");

  } catch (err) {
    console.error("Error fetching expenses:", err);
    setError("Failed to fetch expenses.");
  }
};

// Function to delete an expense by ID
// Returns a result object: { ok: true/false, data: the server response }
export const deleteExpense = async (expenseId) => {
  // Send DELETE request to backend with Authorization
  const res = await fetch(`${process.env.REACT_APP_API_URL}/expenses/${expenseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  
  // Parse and return the result, along with HTTP status
  return res.json().then(data => ({ ok: res.ok, data }));
};