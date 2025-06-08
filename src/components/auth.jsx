
function auth(requestData, response, type = "login", setStatus, setError) {

  console.log(requestData);
  console.log(response.status);

  /** We check the respsonse code and set the cookies
   * which contain the session usertype and email
   */  
  if (response.status === 200) {

    // If the login/register  is successful, store the session token in a cookie
    document.cookie = `sessionToken=${requestData.token}; path=/;`;
    document.cookie = `userType=${requestData.accountType}; path=/;`;
    document.cookie = `email=${requestData.email}; path=/;`;

    /** Checks the type parameter to determine if it's a
     * login or register action and sets the status message accordingly
     */  
    if (type === "login") {
      setStatus("Login successful! Welcome back!");
    } else if (type === "register") {
      setStatus("Registered successfully! Welcome aboard!");
    }

    // Optionally redirect to window.location.href = "/";
    } else if (response.status === 401) {
      setError("Unauthorized access. Please check your email and password.");
      setStatus("Unauthorized access: " + (requestData.message || ""));
    } else if (response.status === 500) {
      setError("Server error. Please try again later.");
      setStatus("Server Error: " + (requestData.message || ""));
    } else if (response.status === 400) {

    // Error handling    
    const msg = requestData.message || requestData.error || "";
      if (msg.includes("Email is already registered")) {
        setError("Email is already registered. Please use a different email.");
        setStatus("Email already registered");
      } else {
        setError("Bad request. Please check your input.");
        setStatus("Bad Request: " + msg);
      }
    } else if (response.status === 403) {
      setError("Forbidden access. You do not have permission to access this resource.");
      setStatus("Forbidden Access: " + (requestData.message || ""));
    } else if (response.status === 404) {

      // Incorrect user name or password response
      setError("Email or password incorrect. Please try again.");
      setStatus("Email or password incorrect" + (requestData.message || ""));
      
    // Check user creation success
    } else if (response.status === 201) {
    const msg = requestData.message || requestData.error || "";
    if (msg.includes("User created successfully")) {
        setStatus("User created successfully! You can now log in.");
    } else {
        setError("User creation failed. Please try again.");
    }

  } else {
    setError("Login failed. Please try again.");
    setStatus("Unknown error: " + (requestData.message || ""));
  }
}

export { auth };

