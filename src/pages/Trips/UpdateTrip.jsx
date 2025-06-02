import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdateTrip() {
  const { tripId } = userParams()
  const navigate = useNavigate()

  const [trip, setTrip] = useState({
    location: '',
    arrivalDate: '',
    departureDate: ''
  })
}

const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

// Fetch specific trip with 'tripId'
useEffect(() => {
  async function fetchTrip() {
    try {
      const res = await fetch(`http://localhost:3000/trips/trip=${tripId}`) 
      
      if(!res.ok) throw new Error('Trip not found')
      const data = await res.json()
    setTrip(data)
    setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)  
    }
  }
  fetchTrip()
}, [tripId])  


// Handle form to update the trip
function handleChange(e) {
  const { name, value } = e.target
  setTrip(prev => ({ ...prev, [name]: value }))
}


// // Before sending the data, strip out totalExpense if it somehow exists
// const { location, arrivalDate, departureDate } = trip
// const updateData = { location, arrivalDate, departureDate }

// Submit updated trip to backend
async function handleSubmit(e) {
  e.preventDefault()
  try {
    const res = await fetch(`http://localhost:3000/trips/trip=${tripId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    })

    if (!res.ok) throw new Error('Failed to update trip')

      // Redirect to the trip list or details
      navigate('/trips')
  } catch (err) {
    console.error('Update failed:', err)
    setError('Update failed. Try again.')
  }
}

if (loading) return <p>Loading trip...</p>
if (error) return <p className="text-red-500">{error}</p>




return (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Update Trip</h2>
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={trip.location}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="arrivalDate"
        value={trip.arrivalDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="departureDate"
        value={trip.departureDate}
        onChange={handleChange}
        required
      />
      <button 
        type="submit" 
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  </div>
)