import React from 'react';
import './Pop-UpWindow.css';

function ConfirmDeleteModal({ itemName, onConfirm, onCancel }) {
  if (!itemName) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
        <div className="modal-buttons">
          <button className="btn-primary" onClick={onConfirm}>Delete</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;