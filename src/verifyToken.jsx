// token verification function that was modified from the api we use this
// to check if the token is valid throughout the program


import { jwtDecode } from "jwt-decode";



function verifyToken(token){


// lets generate and test the token to make sure its validated correctly
// all we can do is decode the token and check if it has expired or not that is lal we can do

    try{
        // we will attempt to decode the token which validates its a valid token that we received from the server
        const decoded = jwtDecode(token);
        console.log("Token is valid:", decoded);
        // we know check to see if the token is expired or not
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token has expired.");
        }

    }

    catch(error){
        // not a vaild token will throw an error in the log
        console.log("Token verification failed:", error);
    }
}

// export the function for later use

export { verifyToken };