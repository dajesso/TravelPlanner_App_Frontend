import { useMediaQuery } from 'react-responsive';
import "./ExpenseTable.css";

function ExpenseTable({ expenses, onEdit, onDelete }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });

  if (isTabletOrMobile) {
    return (
      <div className="expense-cards">
        {expenses.map((exp) => (
          <div key={exp._id} className="expense-card">
            <p><strong>Category:</strong> {exp.category?.name.charAt(0).toUpperCase() + exp.category?.name.slice(1)}</p>
            <p><strong>Description:</strong> {exp.description}</p>
            <p><strong>Amount:</strong> ${exp.amount}</p>
            <div className="card-buttons">
              <button onClick={() => onEdit(exp)}>Edit</button>
              <button onClick={() => onDelete(exp)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop table layout
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
            <td>{exp.description}</td>
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