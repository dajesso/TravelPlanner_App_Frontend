import { useEffect, useState } from "react";

export default function GetAllTrips() {
    const [trip, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [deleting, setDeleting] = useState(false)

useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch('http://localhost:3000/trips')
        if (!res.ok) throw new Error('Failed to fetch trips')
        const data = await res.json()
        setTrips(data)
      } catch (err) {
        console.error(err)
        setError('Could not load trips.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
}, [])

function openDeletePopup(tripId) {
    const trip = trips.find(t => t._id === tripId)
    setSelectedTrip(trip)
  }

function closePopup() {
  setSelectedTrip(null)
}

async function confirmDelete() {
    if (!selectedTrip) return
    setDeleting(true)
    try {
      const res = await fetch(`http://localhost:3000/trips/${selectedTrip._id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete trip')

      // Remove trip from local state
      setTrips(prev => prev.filter(t => t._id !== selectedTrip._id))
      closePopup()
    } catch (err) {
      console.error(err)
      alert('Could not delete trip. Please try again.')
    } finally {
      setDeleting(false)
    }
  }


return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trips List</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && trips.length === 0 && <p>No trips found. You might need to travel more often</p>}

      <ul className="grid gap-4">
        {trips.map(trip => (
          <li key={trip._id} className="border p-4 rounded shadow">
            <p><strong>Location:</strong> {trip.location}</p>
            <p><strong>Arrival:</strong> {trip.arrivalDate}</p>
            <p><strong>Departure:</strong> {trip.departureDate}</p>
            <p><strong>Total Expenses:</strong> ${trip.totalExpense || 0}</p>
            <button
              onClick={() => handleDeleteClick(trip._id)}
              className="mt-2 text-red-600 underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

{/* Delete confirmation popup */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md">
            <p className="mb-4">
              Are you sure you want to delete <strong>{selectedTrip.location}</strong>? Please note: Once deleted the trip info cannot be recovered
            </p>
            <div className="flex gap-4 justify-end">
              <button onClick={closePopup} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )      
}