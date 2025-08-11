import { useState, useEffect } from 'react'
import {auth} from '../components/auth.jsx';
import { validateAuth, validateForm } from '../components/validateAuth.jsx';
import "./Login.css"

// Register function
function Register() {

  // State hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const schema = validateAuth();
  const [secondsLeft, setSecondsLeft] = useState(30);

  // Countdown to redirect if registration is successful
  useEffect(() => {
    if (secondsLeft === 0) {
      window.location.href = '/login';
      return;
    }
    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Submission handler
  const submitButton = async (event) => {
    event.preventDefault();

  // Start countdown to redirect user
    try{

      // Validation of user input
      const validationError = validateForm(email, password, schema);
      if (validationError) {
        setError(validationError);
        setStatus("");
        return;
      }else{
        setError("");
        setStatus("Validating credentials...");
      }

      // Send data to the server
      const response = await fetch('http://localhost:3000/register', {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          }, body: JSON.stringify({email, password}),
      });
        console.log(JSON.stringify({email, password}))


      // Parses response from server
      const requestData = await response.json();
        console.log(requestData);

      // Authenticate user  
      auth(requestData, response, "register", setStatus, setError);

    // Error handling for wrong login      
    } catch (error) {
      console.error("Error during login:", error);
      console.log(error)
      setError("Login failed. Please try again.");
    }
  }

return (
    <div className="login-page">
      <div className="about-section">
        <h2>Welcome to Travel Planner</h2>
        <p>
          Travel Planner helps you effortlessly manage your trips, track expenses, and stay organized all in one place.
          Whether you're backpacking across Europe or planning a weekend getaway, our intuitive app provides everything you need to
          simplify travel planning. Sign in now to access your personalized dashboard and start organizing your journeys with ease.
        </p>
      </div>
    

  <div className="login-section">
    <h1>Register</h1>
    <form onSubmit={submitButton}>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* Only show status if there is no error */}
      {!error && <p id="registerStatus" style={{ color: 'white' }}>{status}</p>}
      {/* Show error in red */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show login link if registration was successful */}
    {!error && status.toLowerCase().includes('success') && (
      <div style={{ marginTop: '1em' }}>
         <p>Redirecting to login page in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...</p>

      </div>
    )}

     <p>
        Already have an account? <a href="/login">Login</a>
        </p>
      <button type="submit">Register</button>
    </form>
    
  </div>
  </div>
);
}

export default Register;




