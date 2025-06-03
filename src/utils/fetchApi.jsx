import { getToken } from './getToken';

// Generic fetcher
export const fetchData = async (url, setter, errorMsg, setError = console.error) => {
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

// Fetch all expenses for a trip
export const loadExpensesByTrip = async (tripId, setExpenses, setError) => {
  try {
    const res = await fetch(`http://localhost:3000/expenses?trip=${tripId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (res.ok) setExpenses(data);
    else setError(data.error || "Failed to load expenses");
  } catch (err) {
    console.error("Error fetching expenses:", err);
    setError("Failed to fetch expenses.");
  }
};

// Delete expense
export const deleteExpense = async (expenseId) => {
  const res = await fetch(`http://localhost:3000/expenses/${expenseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json().then(data => ({ ok: res.ok, data }));
};