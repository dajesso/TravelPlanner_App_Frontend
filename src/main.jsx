import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import Expense from './pages/Expense.jsx';
import Trips from './pages/Trips.jsx'
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
          
          {/* All trips list page for testing */}
          <Route path="/trips" element={<Trips />} />

          {/* This is the expense route, as it will negivate from tripsPage, and only display ONE Trip's expenses */}
          <Route path="/trips/:tripId" element={<Expense />} />

        </Route>
      </Routes>
    
    </BrowserRouter>
    
  </StrictMode>,
)
