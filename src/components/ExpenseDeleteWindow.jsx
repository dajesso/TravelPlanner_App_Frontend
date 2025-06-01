import React from "react";
import "./ExpenseEditWindow.css";

function ExpenseDeleteWindow({ expense, onConfirm, onCancel }) {
  if (!expense) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{expense.description}</strong>?</p>
        <div className="modal-buttons">
          <button onClick={() => onConfirm(expense._id)}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDeleteWindow;