import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { capitalize } from "../utils/expenseHelper";
import "./ExpenseTable.css";

/**
 * Displays a list of expenses in table or card layout depending on screen size.
 * 
 * Props:
 * - expenses: Array of expense objects to display
 * - onEdit: Function to call when Edit is clicked
 * - onDelete: Function to call when Delete is clicked
 */

function ExpenseTable({ expenses, onEdit, onDelete }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });

  if (isTabletOrMobile) {
    return (
        <div className="expense-cards">
            {expenses.map((exp) => (
                <div key={exp._id} className="expense-card">
                    <div className="expense-meta-row">
                    <span><strong>Category:</strong> {capitalize(exp.category?.name)}</span>
                    <span><strong>Amount:</strong> ${exp.amount}</span>
                    </div>
                    <div className="expense-meta-row">
                    <span className="description"><strong>Description:</strong> {capitalize(exp.description)}</span>
                    <div className="expense-actions">
                        <button onClick={() => onEdit(exp)}>Edit</button>
                        <button onClick={() => onDelete(exp)}>Delete</button>
                    </div>
                    </div>
                </div>
                ))}
        </div>
    );
  }

  // Desktop layout
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp._id}>
            <td>{capitalize(exp.category?.name)}</td>
            <td>{capitalize(exp.description)}</td>
            <td>${exp.amount}</td>
            <td>
              <button onClick={() => onEdit(exp)}>Edit</button>
              <button onClick={() => onDelete(exp)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;