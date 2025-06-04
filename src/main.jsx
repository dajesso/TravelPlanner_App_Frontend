import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import CreateTrip from './pages/Trips/CreateTrip.jsx'
import GetAllTrips from './pages/Trips/GetAllTrips.jsx'
import SearchTripByLocation from './pages/Trips/SearchTripByLocation.jsx'
import Expense from './pages/Expense.jsx';
import Logout from './pages/Logout.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login Page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Layout wrapper */}
        <Route element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />


          {/* Create a new trip */}
          <Route path="/trips/create" element={<CreateTrip />} />

          {/* This is the expense route, as it will navigate from tripsPage, and only display ONE Trip's expenses */}
          <Route path="/trips/:tripId" element={<Expense />} />

          {/* Get all trips */}
          <Route path="trips" element={<GetAllTrips />} /> 

          {/* Search one trip by location */}
          <Route path="/trips/search" element={<SearchTripByLocation />} />

          

        </Route>
      </Routes>
    
    </BrowserRouter>
    
  </StrictMode>,
)
