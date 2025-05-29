import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// We are building onto the template we wil create a html form with a username and password input
// username is email
// we will check the user type and store it into a cookie.
// and we will store the session token in a cookie as well

// this function reutrns html code to generate a html form we create a form with a username and password input and then
// we use events to modify and keep the login information in the form.


function checkLogin()
{

//we handle the state of the form using useState

const [email, setEmail] = useState('');
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const submitButton = async (event) => {
  event.preventDefault();

  try{
    const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",

        // we are sending the data as json

        }), body: JSONstringify({
          email: email,
          password: password)
        })

        // get the data from the request

        const requestData = await response.json();

        console.log(requestData);

    

  });


  return (
    <div>
      <h1>Travel Planner Authentication: Login</h1>
      <form onSubmit={submitButton}>
        <input type="email" placeholder="hello@hello.com" required
        value={email}
        onchange={(event) => setEmail(event.target.value)}/>
        
        <input type="password" placeholder="123456" value={password}
        onChange={(event) => setPassword(event.target.value)} required
        />
        <button type="submit">Login</button>
        </form>
    </div>
  );
}



export default checkLogin();

