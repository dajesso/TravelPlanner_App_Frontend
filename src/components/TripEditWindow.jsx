import React, { useState, useEffect } from "react";
import { getToken } from "../utils/getToken";
import "./Pop-UpWindow.css";

function TripEditWindow({ trip, onClose, onSave }) {
  const [formData, setFormData] = useState({
    location: "",
    arrivalDate: "",
    departureDate: "",
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (trip) {
      setFormData({
        location: trip.location || "",
        arrivalDate: trip.arrivalDate || "",
        departureDate: trip.departureDate || "",
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear all previous error
    setLocalError("");

    try {
      const res = await fetch(`http://localhost:3000/trips/${trip._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        onSave(data); // Refresh trip data
        onClose();    // Close modal
      } else {
        setLocalError("Update failed: " + data.error); 

      }
    } catch (err) {
        setLocalError("Network error: " + err.message); 
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Trip</h3>
        {localError && <p className="modal-error">{localError}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Location:
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Arrival Date (DD/MM/YYYY):
            <input
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Departure Date (DD/MM/YYYY):
            <input
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripEditWindow;