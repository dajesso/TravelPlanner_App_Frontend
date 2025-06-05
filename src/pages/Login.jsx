import { useState } from 'react'
import {validateAuth, validateForm} from '../components/validateAuth.jsx';

import {auth} from '../components/auth.jsx';

import "./Login.css"
// We are building onto the template we wil create a html form with a username and password input
// username is email
// we will check the user type and store it into a cookie.
// and we will store the session token in a cookie as well

// this function reutrns html code to generate a html form we create a form with a username and password input and then
// we use events to modify and keep the login information in the form.


function Login()
{

//we handle the state of the form using useState

const [email, setEmail] = useState('');
const [password, setPassword] = useState("");
const [status, setStatus] = useState("");
const [error, setError] = useState("");
const schema = validateAuth();


const submitButton = async (event) => {
event.preventDefault();






  try{

    // Validate the form data using the schema
    // validation error occurs it will return and end the code block
    const validationError = validateForm(email, password, schema);

      if (validationError) {
        setError(validationError);
        setStatus("");
        return;
      }else{
        setError("");
        setStatus("Validating credentials...");
        }

        const response = await fetch("http://localhost:3000/login", {
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

        auth(requestData, response, "login", setStatus, setError);

  
  } catch (error) {
    console.error("Error during login:", error);
    console.log(error)
    setError("Login failed. Please try again.");
  }
}


// fixed a bug errors are red successful logins are white.

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
        <h1>Login</h1>
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
          {!error && <p id="loginStatus" style={{ color: 'white' }}>{status}</p>}
          {/* Show error in red */}
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


export default Login;

