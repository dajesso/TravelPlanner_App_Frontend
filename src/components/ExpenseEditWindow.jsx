// Logics:
// 1. Get the existing expense data
// 2. Create a form to manage input fields
// 3. Fill in the form with the existing data
// 4. When the user types in a field, updates that field in the form data (and other fields can just reuse the previous data)
// 5. When the user submits the form sends the updated data to the backend

import React, { useEffect, useState } from "react";
import "./Pop-UpWindow.css";


// {current expense object we want to edit, function to close the popup, function to save the updated data.}
function ExpenseEditWindow({ expense, onClose, onSave }) {

    // [ holds the values for the form fields ,  function to update the form data]
    const [formData, setFormData] = useState({
        // start the field with empty first with ""
        category: "",
        description: "",
        amount: ""
    });
    const [categories, setCategories] = useState([]);

    if (!expense) return null;

  // Run everytime when the expense changed (prefill the form)
    useEffect(() => {
        console.log("Editing expense:", JSON.stringify(expense, null, 2));
        console.log("Expense._id:", expense?._id);
        if (expense) {
            setFormData({
                category: expense.category?._id  || "",
                description: expense.description  || "",
                amount: expense.amount  || ""
            });
        }
    // Run this effect whenever the value of expense changes
  }, [expense]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = document.cookie
                    .split("; ")
                    .find(row => row.startsWith("sessionToken="))
                    ?.split("=")[1];

                const res = await fetch("http://localhost:3000/categories", {
                    headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            
            if (res.ok) setCategories(data);

            else console.error("Failed to load categories:", data.error);

            } catch (err) {
                console.error("Error fetching categories:", err.message);
            }
        };

    fetchCategories();
    }, []);

// When user types into an input field
  //e = event that happens when the user types.
    const handleChange = (e) => {
        // <input name="description" value="Coffee" />
        const { name, value } = e.target;
        // copy everything from the previous state, only change the updated one
        setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When user submit
    const handleSubmit = async (e) => {
        // stop the page from reloading
        e.preventDefault();
    try {
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("sessionToken="))
        ?.split("=")[1];

      const res = await fetch(`http://localhost:3000/expenses/${expense._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            category: formData.category,
            description: formData.description,
            amount: formData.amount
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // update parent state
        onSave(data); 
        // close modal
        onClose(); 
      } else {
        alert("Update failed: " + data.error);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return(
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Expense</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                    ))}
                </select>
          </label>
          <label>
            Description:
            <input name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>
            Amount:
            <input name="amount" type="number" value={formData.amount} onChange={handleChange} required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ExpenseEditWindow