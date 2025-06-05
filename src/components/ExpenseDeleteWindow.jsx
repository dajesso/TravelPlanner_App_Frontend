import React from "react";
import "./Pop-UpWindow.css";

function ExpenseDeleteWindow({ expense, onConfirm, onCancel }) {
  if (!expense) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{expense.description}</strong>?</p>
        <div className="modal-buttons">
          <button className="btn-primary" onClick={() => onConfirm(expense._id)}>Delete</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDeleteWindow;