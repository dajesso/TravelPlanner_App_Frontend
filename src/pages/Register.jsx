import { useState } from 'react'

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { verifyToken } from '../components/verifyToken.jsx'

import {auth} from '../components/auth.jsx';
import { validateAuth, validateForm } from '../components/validateAuth.jsx';

// We are building onto the template we will create a html form with a username and password input
function Register()
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



    const validationError = validateForm(email, password, schema);

    if (validationError) {
      setError(validationError);
      setStatus("");
      return;
    }else{
      setError("");
      setStatus("Validating credentials...");
    }

    const response = await fetch("http://localhost:3000/register", {
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
  <div>
    <h1>Travel Planner Authentication: Register</h1>
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
      <button type="submit">Register</button>
    </form>
  </div>
);
}

export default Register;




