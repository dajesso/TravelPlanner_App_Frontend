import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { verifyToken } from '../components/verifyToken.jsx'


// We are building onto the template we wil create a html form with a username and password input
// username is email
// we will check the user type and store it into a cookie.
// and we will store the session token in a cookie as well

// this function reutrns html code to generate a html form we create a form with a username and password input and then
// we use events to modify and keep the login information in the form.






function Register()
{

//we handle the state of the form using useState

const [email, setEmail] = useState('');
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const submitButton = async (event) => {
event.preventDefault();


  try{
    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",

        // we are sending the data as json

        }, body: JSON.stringify({email, password}),

   
    });

      console.log(JSON.stringify({email, password}))


        // get the data from the request

        const requestData = await response.json();

        console.log(requestData);
  

        // we check the response status to see if the registeration was successful or not
        // we handled most of the errors in the backend so we will just check the status code

      

        if(response.status.valueOf() === 201) {

 

          console.log("User created successfully");
          //window.location.href = "/login.html"; // Redirect to the home page
        }
        
        else if(response.status.valueOf() === 401) {
          // If the register fails due to unauthorized access, display an error message
          setError("Unauthorized access. Please check your email and password.");
          console.error("Unauthorized access:", requestData.message);
        }
        else if(response.status.valueOf() === 500) {
          // If the registeration fails due to a server error, display an error message
          setError("Server error. Please try again later.");
          console.error("Server error:", requestData.message);
        }

        // this error is usually due to a email account always existing

        else if(response.status.valueOf() === 400) {
          // User account is already registered
          setError("Email is already registered");
          console.error("Email is already registered", requestData.message);
        }
        

        else if(response.status.valueOf() === 400) {
          // bad request is usually due to incorrect input data
          // If the register fails due to bad request, display an error message
          // this is usually due to incorrect input data
          setError("Bad request. Please check your input.");
          console.error("Bad request:", requestData.message);
        }
        else if(response.status.valueOf() === 403) {
          // If the login fails due to forbidden access, display an error message
          setError("Forbidden access. You do not have permission to access this resource.");
          console.error("Forbidden access:", requestData.message);
        }

        else {
          setError("Login failed. Please try again.");
          console.error("Unknown error:", requestData.message);
      }

      

      // we catch all errors i should modify this later to handle the main specific errors
        
  } catch (error) {
    console.error("Error during login:", error);
    console.log(error)
    setError("Login failed. Please try again.");
  }
}



  return (
    <div>
      <h1>Travel Planner Authentication: Register</h1>
      <form onSubmit={submitButton}>
        <input type="email" placeholder="hello@hello.com" required
        value={email}
        onChange={(event) => setEmail(event.target.value)}/>
        
        <input type="password" placeholder="123456" value={password}
        onChange={(event) => setPassword(event.target.value)} required
        />
        <button type="submit">Register</button>
        </form>
    </div>
  );
}

// const root = createRoot(document.getElementById("register"));
// root.render(<Register />);

export default Register;

