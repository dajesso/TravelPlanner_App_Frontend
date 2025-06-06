import { useState, useEffect } from 'react'

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { verifyToken } from '../components/verifyToken.jsx'

import {auth} from '../components/auth.jsx';
import { validateAuth, validateForm } from '../components/validateAuth.jsx';

import "./Login.css"

// We are building onto the template we will create a html form with a username and password input
function Register()
{

//we handle the state of the form using useState

const [email, setEmail] = useState('');
const [password, setPassword] = useState("");
const [status, setStatus] = useState("");
const [error, setError] = useState("");
const schema = validateAuth();

const [secondsLeft, setSecondsLeft] = useState(30);

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


const submitButton = async (event) => {
event.preventDefault();

// We use this effect to start the countdown to the redirect
  try{
    const validationError = validateForm(email, password, schema);
    if (validationError) {
      setError(validationError);
      setStatus("");
      return;
    }else{
      setError("");
      setStatus("Validating credentials...");
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",

        // we are sending the data as json

        }, body: JSON.stringify({email, password}),

        

   
    });


      // now to deal with the response we will use the auth function


      console.log(JSON.stringify({email, password}))


        // get the data from the request

        const requestData = await response.json();

        console.log(requestData);

        auth(requestData, response, "register", setStatus, setError);

        
  } catch (error) {
    console.error("Error during login:", error);
    console.log(error)
    setError("Login failed. Please try again.");
  }
}

// display the web form and set register status to the status message of the error or success message


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




