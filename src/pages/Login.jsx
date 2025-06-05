import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAuth, validateForm } from '../components/validateAuth.jsx';
import { auth } from '../components/auth.jsx';
//import './Login.css';

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

    const validationError = validateForm(email, password, schema);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus('Validating credentials...');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const requestData = await response.json();
      auth(requestData, response, 'login', setStatus, setError);

      if (response.ok && requestData.token) {
        navigate('/trips');
      }
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
          Travel Planner helps you manage trips, track expenses, and stay organized.
          Sign in to access your dashboard and start planning!
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
          {!error && <p style={{ color: 'white' }}>{status}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}