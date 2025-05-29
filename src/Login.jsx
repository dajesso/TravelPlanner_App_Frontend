import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { verifyToken } from './verifyToken'


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
const [error, setError] = useState("");

const submitButton = async (event) => {
event.preventDefault();


  try{
    const response = await fetch("http://localhost:3000/login", {
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

        if(response.status.valueOf() === 200) {
          // If the login is successful, store the session token in a cookie
          document.cookie = `sessionToken=${requestData.token}; path=/;`;
          document.cookie = `userType=${requestData.accountType}; path=/;`;
          document.cookie = `email=${requestData.email}; path=/;`;

          // hey why not lets test to see if the token is valid.

          console.log(verifyToken(requestData.token));



          console.log("Login successful, session token stored in cookie.");
          //window.location.href = "/"; // Redirect to the home page

          console.log(document.cookie);
        }
        
        if(response.status.valueOf() === 401) {
          // If the login fails due to unauthorized access, display an error message
          setError("Unauthorized access. Please check your email and password.");
          console.error("Unauthorized access:", requestData.message);
        }
        else if(response.status.valueOf() === 500) {
          // If the login fails due to a server error, display an error message
          setError("Server error. Please try again later.");
          console.error("Server error:", requestData.message);
        }
        else if(response.status.valueOf() === 400) {
          // If the login fails due to bad request, display an error message
          setError("Bad request. Please check your input.");
          console.error("Bad request:", requestData.message);
        }
        else if(response.status.valueOf() === 403) {
          // If the login fails due to forbidden access, display an error message
          setError("Forbidden access. You do not have permission to access this resource.");
          console.error("Forbidden access:", requestData.message);
        }
        else if(response.status.valueOf() === 404) {
          // If the login fails due to not found, display an error message
          setError("User not found. Please check your username and password.");
          console.error("Not found:", requestData.message);
        }
        
  } catch (error) {
    console.error("Error during login:", error);
    console.log(error)
    setError("Login failed. Please try again.");
  }
}



  return (
    <div>
      <h1>Travel Planner Authentication: Login</h1>
      <form onSubmit={submitButton}>
        <input type="email" placeholder="hello@hello.com" required
        value={email}
        onChange={(event) => setEmail(event.target.value)}/>
        
        <input type="password" placeholder="123456" value={password}
        onChange={(event) => setPassword(event.target.value)} required
        />
        <button type="submit">Login</button>
        </form>
    </div>
  );
}

const root = createRoot(document.getElementById("login"));
root.render(<Login />);

export default Login;

