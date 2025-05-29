import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserJwtProvider } from './context/UserJwtProvider.jsx'

import './index.css'
import App from './App.jsx'
import Login from "./Login.jsx";
import Expense from './pages/expense.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserJwtProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/expenses" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </UserJwtProvider>
  </StrictMode>,
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);