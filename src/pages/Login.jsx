import { useState } from 'react'
import {validateAuth, validateForm} from '../components/validateAuth.jsx';
// we don't need the followwing imports for now.

//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import { verifyToken } from '../components/verifyToken.jsx'

import {auth} from '../components/auth.jsx';


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
  <div>
    <h1>Travel Planner Authentication: Login</h1>
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
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
        </p>
    </form>
  </div>
);
}

// const root = createRoot(document.getElementById("login"));
// root.render(<Login />);

export default Login;

