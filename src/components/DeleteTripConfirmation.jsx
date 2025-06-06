import React from 'react';
import './Pop-UpWindow.css';

export default function DeleteTripConfirmation({ trip, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete the trip to <strong>{trip.location}</strong>?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes, Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}