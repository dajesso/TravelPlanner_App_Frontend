import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateTrip() {
  const navigate = useNavigate()

  const [trip, setTrip] = useState({
    location: '',
    arrivalDate: '',
    departureDate: ''
    // totalExpense is excluded here
  })
const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setTrip(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip)
      })

      if (!res.ok) throw new Error('Failed to create trip')

      navigate('/trips')
    } catch (err) {
      console.error('Creation failed:', err)
      setError('Could not create trip. Please try again.')
    }
  }


  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Trip</h2>
      {error && <p className="text-red-600">{error}</p>}

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
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Create Trip
        </button>
      </form>
    </div>
  )
}