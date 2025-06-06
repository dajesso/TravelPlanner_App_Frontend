// we just call the logout function from the auth service



// the only way to delete cookies is to set the expiration date to a date in the past


import { useEffect, useState } from 'react';

function Logout() {
  // Clear cookies
  document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';


  // Redirect to login page after 30 seconds
  // We can use a countdown timer to show the user how long they have until they are redirected
  // We will use the useState and useEffect hooks to create a countdown timer

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

  return (
    <div>
      <h1>You have been logged out.</h1>
      <p>Redirecting to login page in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...</p>
    </div>
  );
}

export default Logout;