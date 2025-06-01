import Joi from 'joi-browser';
import React,  { useState } from 'react';


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
  const { error } = schema.validate({ email, password });

  // lets limit the tlds to prevent spam and other issues
  const allowedTlds = ['com', 'org', 'net', 'info', 'me'];
  const tld = email.split('.').pop();
  if (!allowedTlds.includes(tld)) {
    return 'Email must end with .com, .org, .net, .info, .me';
  }


  return error ? error.details[0].message : null;
};



export { validateAuth };
export { validateForm };
