// we just call the logout function from the auth service



// the only way to delete cookies is to set the expiration date to a date in the past


function Logout(){
// Clear the token from localStorage
  document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  // Redirect to the login page
  window.location.href = '/login';

  return null; // This component does not render anything
}

export default Logout;