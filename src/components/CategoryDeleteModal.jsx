import React from "react";
import "./Pop-UpWindow.css"; // Reuse modal styles

function CategoryManagerModal({ categories, onClose, onDelete }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Manage Categories</h3>
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li key={cat._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>{cat.name}</span>
                <button
                  style={{ color: "white", backgroundColor: "red", border: "none", borderRadius: "4px", padding: "0.2rem 0.5rem" }}
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${cat.name}"?`)) {
                      onDelete(cat._id);
                    }
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagerModal;
