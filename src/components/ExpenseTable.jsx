import "./ExpenseTable.css"

function ExpenseTable({ expenses, onEdit, onDelete }) {
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
        {expenses.map(exp => (
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