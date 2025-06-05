import Joi from 'joi-browser';


// this component is used to validate the username and password
// on the login and register pages so we don't get invalid data
// we need to install joi-browser for this to work you can use npm




function validateAuth() {
    return Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false} })
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    });
}



// we now validate the form data using the schema we created above


// we create a schema for the email and password validation using Joi

const validateForm = (email, password, schema) => {


  // check the email and password fields to see if they are empty
// check if one or the other is empty and return an error message
// check to see if the email contains a @ and a . in the email address





  console.log('validateForm called with:', { email, password });


      if (!email && !password) {
        return "Please enter your email and password."; 
      } else if (!password) {
        return "Please enter your password";
      } else if (!email) {
        return "Please enter your email address.";
      } else if (!email.includes("@") || !email.includes(".")) {
        return "Please enter a valid email address.";
    }


  // lets limit the tlds to prevent spam and other issues
  const allowedTlds = ['com', 'org', 'net', 'info', 'me'];
  const tld = email.split('.').pop();
  if (!allowedTlds.includes(tld)) {
    return 'Email must end with .com, .org, .net, .info, .me';
  }


  const { error } = schema.validate({ email, password });

  return error ? error.details[0].message : null;
};



export { validateAuth };
export { validateForm };
