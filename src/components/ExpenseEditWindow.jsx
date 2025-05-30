import React, { useEffect, useState } from "react";
import "./ExpenseEditWindow.css";

function ExpenseEditWindow({ expense, onClose, onSave }) {
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        amount: ""
  });
  // Pre-fill form when expense data is passed in
    useEffect(() => {
        if (expense) {
        setFormData({
            category: expense.category?._id  || "",
            description: expense.description  || "",
            amount: expense.amount  || ""
        });
        }
  }, [expense]);

// When user types into an input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When user submit
    const handleSubmit = async (e) => {
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        onSave(data); // update parent state
        onClose(); // close modal
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
            Category ID:
            <input name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Amount:
            <input name="amount" type="number" value={formData.amount} onChange={handleChange} />
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