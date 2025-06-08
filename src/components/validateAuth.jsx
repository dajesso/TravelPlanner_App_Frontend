
import Joi from 'joi';
import React,  { useState } from 'react';

/** 
 * this component is used to validate the username and password
 * on the login and register pages so we don't get invalid data
*/

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

  /** Check the email and password fields to see if they are empty,
   * check empty fields and return error message,
   * check if email contains '@' and '.' 
  */

 // Take input and validate it
  const validateForm = (email, password, schema) => {
    console.log('validateForm called with:', { email, password });

    if (!email && !password) {
      return "Please enter your email and password."; 
    } else if (!password) {
      return "Please enter your password";
    } else if (!email) {
      return "Please enter your email address.";
    } else if (!email.includes("@") || !email.includes(".")) {
      return "That's not an email address, come on! Please, enter a valid email address.";
  }


  // Limit tlds to prevent spam and other issues
  const allowedTlds = ['com', 'org', 'net', 'info', 'me'];
  const tld = email.split('.').pop();
  if (!allowedTlds.includes(tld)) {
    return 'Email must end with .com, .org, .net, .info, .me';
  }

  // Error handling
  const { error } = schema.validate({ email, password });
    return error ? error.details[0].message : null;
  };


export { validateAuth };
export { validateForm };