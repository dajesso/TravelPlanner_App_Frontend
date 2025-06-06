import React, { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import './Pop-UpWindow.css';

function CategoryManagerModal({ categories, onClose, onDelete, expenses }) {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [error, setError] = useState("");
    
  const handleDelete = (categoryId, categoryName) => {
    const isUsed = expenses.some(exp => exp.category?._id === categoryId);

    if (isUsed) {
      setError(`"${categoryName}" is in use by some expenses.`);
      return;
    }

    // clear error first
    setError(""); 
    setCategoryToDelete({ id: categoryId, name: categoryName });
    };
        
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Manage Categories</h3>
        {error && <p className="modal-error">{error}</p>}

        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li key={cat._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>{cat.name}</span>
                <button
                  type = "button"
                  className="btn-primary"
                  onClick={() => handleDelete(cat._id, cat.name)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="modal-buttons">
          <button className="btn-cancel" type="button" onClick={onClose}>Close</button>
        </div>
        {categoryToDelete && (
        <ConfirmDeleteModal
          itemName={categoryToDelete.name}
          onConfirm={() => {
            onDelete(categoryToDelete.id);
            setCategoryToDelete(null);
          }}
          onCancel={() => setCategoryToDelete(null)}
        />
      )}
      </div>
    </div>
  );
}

export default CategoryManagerModal;
