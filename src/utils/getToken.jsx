// Utility function to get the session token from browser cookies
export const getToken = () =>
  // Split cookies into individual items by '; ' and find the one that starts with 'sessionToken='
  document.cookie
    .split("; ")
    .find(row => row.startsWith("sessionToken="))
    // If found, split it again by '=' and return the token value (index 1)
    ?.split("=")[1];