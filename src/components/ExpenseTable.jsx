import { useMediaQuery } from 'react-responsive';
import "./ExpenseTable.css";

function ExpenseTable({ expenses, onEdit, onDelete }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });
  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

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
                    <div className="card-buttons">
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
            <td>{exp.category?.name.charAt(0).toUpperCase() + exp.category?.name.slice(1)}</td>
            <td>{exp.description.charAt(0).toUpperCase() + exp.description.slice(1)}</td>
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