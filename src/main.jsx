import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import UpdateTrip from './pages/Trips/UpdateTrip.jsx'
import GetOneTrip from './pages/Trips/GetOneTrip.jsx'
import Expense from './pages/Expense.jsx';
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login Page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout wrapper */}
        <Route element={<App />}>

          {/* GET one trip*/}
          <Route path="/trips/:tripId" element={<GetOneTrip />} />

          {/* UPDATE one trip*/}
          <Route path="/trips/:tripId/edit" element={<UpdateTrip />} />
          
          {/* This is the expense route, as it will negivate from tripsPage, and only display ONE Trip's expenses */}
          <Route path="/trips/:tripId" element={<Expense />} />

        </Route>
      </Routes>
    
    </BrowserRouter>
    
  </StrictMode>,
)
