/** Token verification function modified from the API
 * It is used to check if Token is valid throughout
 * the program
 */

import { jwtDecode } from "jwt-decode";

function verifyToken(token){
  try{

    // Decode and validate   
    const decoded = jwtDecode(token);
    console.log("Token is valid:", decoded);

    // Check if Token has not expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token has expired.");
    }
  } catch (error){
    // Invalid token will throw an error in the log
    console.log("Token verification failed:", error);
  }
}

// export the function for later use
export { verifyToken };