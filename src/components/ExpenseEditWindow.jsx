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

import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/getToken';
import CategoryManagerModal from './CategoryDeleteModal';
import CustomSelect from "./CostumSelectCategory";
import { capitalize } from "../utils/expenseHelper";
import './Pop-UpWindow.css';

// Current expense object we want to edit, function to close the popup, function to save the updated data.}
function ExpenseEditWindow({ expense, tripId, expenses,onClose, onSave }) {
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

    // Delete category
    const [showCategoryManager, setShowCategoryManager] = useState(false);

    // Error Handling
    const [localError, setLocalError] = useState("");


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
                const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
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

        // Clear all previous error
        setLocalError("");

        // User side validation before submitting to backend
        if (!formData.category || !formData.description.trim() || !formData.amount) {
            if (!formData.category) {
                setLocalError("Category is required.");
            } else if (!formData.description.trim()) {
                setLocalError("Description is required.");
            } else if (!formData.amount) {
                setLocalError("Amount is required.");
            }
            return; 
        }

        try {
            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode
                ? `${process.env.REACT_APP_API_URL}/expenses/${expense._id}`
                : `${process.env.REACT_APP_API_URL}/expenses`;

            const body = {
                ...formData,
                ...(isEditMode ? {} : { trip: tripId }),
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (res.ok) {
                onSave(data);
                onClose();
            } else {
                setLocalError(`Update failed: ${data.error}`);
            }
        } catch (err) {
            setLocalError(`Network error: ${err.message}`);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            setLocalError("Category name cannot be empty.");
            return;
        }

        try {
            const categoryRes = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ name: newCategoryName.trim() }),
        });

        const categoryData = await categoryRes.json();

        if (!categoryRes.ok) {
            setLocalError("Failed to add new category: " + categoryData.error);
            return;
        }

        // Update dropdown list and select new category
        setCategories((prev) => [...prev, categoryData]);
        setFormData((prev) => ({ ...prev, category: categoryData._id }));
        setIsAddingCategory(false);
        setNewCategoryName("");
        setLocalError(""); 
    } catch (err) {
            setLocalError("Error creating category: " + err.message);
        }
    };


    const handleCategoryDelete = async (categoryId) => {
         const isUsed = expenses.some((exp) => exp.category?._id === categoryId);

        if (isUsed) {
            setLocalError('This category is in use and cannot be deleted.');
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                setLocalError("Failed to delete category: " + data.error);
            } else {
                // Update category list
                setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
                setLocalError("");

                // Clear selected category if it was deleted
                if (formData.category === categoryId) {
                    setFormData((prev) => ({ ...prev, category: "" }));
                }
                setLocalError('');
        }
    } catch (err) {
        setLocalError(`Error deleting category: ${err.message}`); 
    }
};

  return(
    <>
        <div className="modal-backdrop">
        <div className="modal-content">
            <h3>{isEditMode ? "Edit Expense" : "Add Expense"}</h3>
            {localError && <p className="modal-error">{localError}</p>}
            <form onSubmit={handleSubmit}>
            <label>
                Category:
                    {!isAddingCategory ? (
                        <>
                            <CustomSelect
                                options={[
                                    ...categories.map(cat => ({ _id: cat._id, name: capitalize(cat.name)
                                    })),
                                    { _id: "__add_new__", name: "+ Add New Category" }
                                    ]}
                                value={formData.category}
                                onChange={(selectedId) => {
                                    if (selectedId === "__add_new__") {
                                    setIsAddingCategory(true);
                                    
                                    } else {
                                    setFormData(prev => ({ ...prev, category: selectedId }));
                                    }
                                }}
                                placeholder="-- Select Category --"
                            />
                            <button
                                type="button"
                                style={{ marginTop: "0.5rem" }}
                                onClick={() => setShowCategoryManager(true)}
                            >
                                Manage Categories
                            </button>
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
                                    // required
                                />
                                <button 
                                    type="button" 
                                    className='inline-button'
                                    onClick={handleAddCategory}
                                >
                                    Add   
                                </button>
                                <button
                                    className="inline-button-cancel"
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
                <input name="description" value={formData.description} onChange={handleChange} /*required*/ />
            </label>
            <label>
                Amount:
                <input name="amount" type="number" value={formData.amount} onChange={handleChange} /*required*//>
            </label>
            <div className="modal-buttons">
                <button className="btn-primary" type="submit">Save</button>
                <button className="btn-cancel" type="button" onClick={onClose}>Cancel</button>
            </div>
            </form>
        </div>
        </div>
        {showCategoryManager && (
            <CategoryManagerModal
                categories={categories}
                setCategories={setCategories}
                onClose={() => setShowCategoryManager(false)}
                onDelete={handleCategoryDelete}
                expenses={expenses}
            />
        )}
    </>
    );
}
export default ExpenseEditWindow