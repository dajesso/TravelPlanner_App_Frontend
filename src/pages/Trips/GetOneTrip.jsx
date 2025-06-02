import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function GetOneTrip() {
  const { tripId } = useParams()
  const navigate = useNavigate()

  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

useEffect(() => {
  async function fetchTrip() {
    try {
      const res = await fetch(`http://localhost:3000/${tripId}`)
      if (!res.ok) throw new Error('Are you sure you visited this destination?')
      const data = await res.json()
      setTrip(data)
    } catch (err) {
      console.error(err)
      setError('Could not load trip.')
    } finally {
      setLoading(false)
    }
  }

  fetchTrip()
}, [tripId])

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`http://localhost:3000/trips/${tripId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Delete failed')
      navigate('/trips') // redirect to all trips after deletion
    } catch (err) {
      console.error(err)
      alert('Could not delete trip.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <p>Loading trip...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!trip) return <p>No trip data.</p>


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

      <div className="border p-4 rounded shadow max-w-md">
        <p><strong>Location:</strong> {trip.location}</p>
        <p><strong>Arrival Date:</strong> {trip.arrivalDate}</p>
        <p><strong>Departure Date:</strong> {trip.departureDate}</p>
        <p><strong>Total Expenses:</strong> ${trip.totalExpense || 0}</p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => navigate(`/trips/${trip._id}/edit`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Trip
          </button>

          <button
            onClick={() => setConfirmingDelete(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Trip
          </button>
        </div>
      </div>

      {confirmingDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md">
            <p className="mb-4">
              Are you sure you want to delete <strong>{trip.location}</strong>? Please note: Once deleted the trip info cannot be recovered
            </p>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setConfirmingDelete(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleDelete}
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