// Since i have the time I'm going to create a function that retrieves the token from the cookie

function retrieveToken() {  
    // This function retrieves the session token from the cookies

    // then we split it and grab the data we need sessionToken, userType, user.

    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('sessionToken='));
    tokenCookie ? tokenCookie.split('=')[1] : null;

    const userTypeCookie = cookies.find(cookie => cookie.startsWith('userType='));
    userTypeCookie ? userTypeCookie.split('=')[1] : null;

    const emailCookie = cookies.find(cookie => cookie.startsWith('email='));
    emailCookie ? emailCookie.split('=')[1] : null;

    // now to log the data we retrieved from the cookies
    console.log("Session Token:", tokenCookie ? tokenCookie.split('=')[1] : "Not found");
    console.log("User Type:", userTypeCookie ? userTypeCookie.split('=')[1] : "Not found");
    console.log("Email:", emailCookie ? emailCookie.split('=')[1] : "Not found");
}


export {retrieveToken};