import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAuth, validateForm } from '../components/validateAuth.jsx';
import { auth } from '../components/auth.jsx';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const schema = validateAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('');

    // Validate input
    const validationError = validateForm(email, password, schema);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus('Validating credentials...');

    // Take user input and send it the server
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const requestData = await response.json();
      console.log(requestData);

      // Authentication handler
      auth(requestData, response, 'login', setStatus, setError);

      // Redirects user is login is successful
      if (response.ok && requestData.token) {
        navigate('/trips');
      }

    // Error handling  
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  }

  return (
    <div className="login-page">
      <div className="about-section">
        <h2>Welcome to Travel Planner</h2>
        <p>
          Travel Planner helps you effortlessly manage your trips, track expenses, and stay organized all in one place.
          Whether you're backpacking across Europe or planning a weekend getaway, our intuitive app provides everything
          you need to simplify travel planning. Sign in now to access your personalized dashboard and start organizing
          your journeys with ease.
        </p>
      </div>

      <div className="login-section">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Only show status if there is no error */}
          {!error && <p className="login-message" id="loginStatus" style={{ color: 'white' }}>{status}</p>}
          {/* Show error in red */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}