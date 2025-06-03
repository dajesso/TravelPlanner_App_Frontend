// Edit Expense Window Logics:
// 1. Get the existing expense data
// 2. Create a form to manage input fields
// 3. Fill in the form with the existing data
// 4. When the user types in a field, updates that field in the form data (and other fields can just reuse the previous data)
// 5. When the user submits the form sends the updated data to the backend

// Add expense window code logic:
// Reason: Re-use what we had (Edit Expense Window) as these two windows have similar features
// 1. Detect whether the user are editing or adding
// 2. Adjust the form title and API
// 3. Save it (as same as save Edit)

import React, { useEffect, useState } from "react";
import { getToken } from '../utils/getToken';
import "./Pop-UpWindow.css";

// Current expense object we want to edit, function to close the popup, function to save the updated data.}
function ExpenseEditWindow({ expense, tripId, onClose, onSave }) {
    // Check is it Edit mode or Add mode
    const isEditMode = Boolean(expense?._id);

    // Initialize form with empty strings
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        amount: ""
    });

    // Store available categories from the backend
    const [categories, setCategories] = useState([]);

    //Add category
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

  // Run everytime when the expense changed (prefill the form)
    useEffect(() => {
        if (expense) {
            setFormData({
                category: expense.category?._id  || "",
                description: expense.description  || "",
                amount: expense.amount  || ""
            });
        }
    // Run this effect whenever the value of expense changes
  }, [expense]);

    // Load all categories from the server once when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/categories", {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });

            const data = await res.json();
            
            if (res.ok) setCategories(data);

            else console.error("Failed to load categories:", data.error);

            } catch (err) {
                console.error("Error fetching categories:", err.message);
            }
        };

    fetchCategories();
    // Only run on first render
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

            let categoryId = formData.category;

            // Create new category if needed
            if (isAddingCategory && newCategoryName.trim()) {
            const categoryRes = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ name: newCategoryName.trim() }),
            });

            const categoryData = await categoryRes.json();

            if (!categoryRes.ok) {
                return alert("Failed to add new category: " + categoryData.error);
            }

            categoryId = categoryData._id; 

            // Update UI and category list
            setIsAddingCategory(false);
            setNewCategoryName("");
            setCategories((prev) => [...prev, categoryData]);

            // Save the new category in formData
            setFormData((prev) => ({ ...prev, category: categoryId }));
            }

            // Choose the mode
            const url = isEditMode
            ? `http://localhost:3000/expenses/${expense._id}`
            : "http://localhost:3000/expenses";

            const method = isEditMode ? "PUT" : "POST";

            // Add Trip Id only when adding a new expense
            const body = {
                ...formData,
                category: categoryId,
                ...(isEditMode ? {} : { trip: tripId }),
            };
            
            // Send request to backend
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },

                // Convert data to Json
                body: JSON.stringify(body),
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
        <h3>{isEditMode ? "Edit Expense" : "Add Expense"}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
                {!isAddingCategory ? (
                    <>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={(e) => {
                                if (e.target.value === "__add_new__") {
                                setIsAddingCategory(true);
                                setFormData((prev) => ({ ...prev, category: "" }));
                                } else {
                                handleChange(e);
                                }
                            }}
                            required
                        >

                        <option value="">-- Select Category --</option>

                        {categories.map((cat) => (

                            <option key={cat._id} value={cat._id}>
                            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                            </option>

                        ))}

                        <option value="__add_new__">+ Add New Category</option>
                        </select>
                    </>

                    ) : (
                    <>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <input
                                type="text"
                                name="newCategory"
                                placeholder="Enter new category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                            <button type="submit">Add</button>
                            <button
                                type="button"
                                onClick={() => {
                                setIsAddingCategory(false);
                                setNewCategoryName("");
                                }}

                            >
                            Cancel
                            </button>
                        </div>
                    </>
                    )}
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