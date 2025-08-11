// /** Logout function not active in the development phase
//  * While we are using 'localhost' the logout function won't 
//  * be used. Function available for future use
//  */

// import { useEffect, useState } from 'react';

// function Logout() {
//   // Clear cookies
//   document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
//   document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
//   document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

//   // Countdown to redirect user to 'Login' page
//   const [secondsLeft, setSecondsLeft] = useState(30);

//   useEffect(() => {
//     if (secondsLeft === 0) {
//       window.location.href = '/login';
//       return;
//     }

//     const timer = setTimeout(() => {
//       setSecondsLeft(secondsLeft - 1);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [secondsLeft]);

//   return (
//     <div>
//       <h1>You have been logged out.</h1>
//       <p>Redirecting to login page in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...</p>
//     </div>
//   );
// }

// export default Logout;