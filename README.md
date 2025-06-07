# Assignment3 - Construct a Front-End Web Application

# Diploma of Web Development at CoderAcademy - Cohort October 2024


### 16020 - Tsai-Chi Yang
### 15524 - Hernan Velasquez
### 16011 - Jessica Amy

## Table of contents

1. [Code Style Guide - AirBnB JavaScript Style Guide](#code-style-guide-airbnb-javascript-style-guide)
1.1 [Usage in our code](#usage-in-our-code)

2. [Dependent software and packages](#Dependent-software-and-packages)
- [Core Dependencies](#core-dependencies)
- [Development dependencies](#development-dependencies)
2. [Hardware requirements](#hardware-requirements)


---
## Code Style Guide - AirBnB JavaScript Style Guide

The code of the Travel Planner Web Application is written following the **Airbnb JavaScript Style Guide**(Airbnb, 2025)[^1], to facilitate readability, safe JavaScript practices, and seamless interaction among coders that might want to inspect this source in the future.

### Usage in our code

The use of the **Airbnb JavaScript Style Guide** is mainly focused on mantaining readability, naming conventions, designing clear and functional components, simple and meaningful comments, *PascalCase* for components, and *camelCase* for prop names.

## Dependent software and packages

This project uses software packages which enhance a friendly user interaction, straigthforward client and server communication, data security, and responsivenes.

### Core Dependencies

- **joi (^17.13.3)** --> robust schema-based validation library for JavaScript. It is used to validate login credentials making sure the user is allowed to perform certain operations in the app. Joi enforces that data shape and type, reducing problems for incorrect user input (Joi, 2025)[^2].

- **jwt-decode (^4.0.0)** --> it helps to decode the JSON Web Token without verfing their signature, by-passing the need to re-authenticate when extracting key such as email, role, and user ID(npm, 2023)[^3].

- **React (^19.1.0)** --> main library that allows to build user interfaces in the Travel Planer application. It provides the building blocks as components, hooks, among others for rendering the UI and user interaction (React, 2023)[^4]

- **react-dom (^19.1.0)** --> this package provides methods tailored for the DOM, to render the application directly in the browser, functionalities such as faster pre-loading of scripts, CSS filess, fonts, and rendering the app into the #root (React, 2025)[^5].

- **react-responsive (^10.0.1)** --> component-based for website adaptability to different size device. Media-query behaviour directly in JavaScript/JSX (npm, 2023)[^6].

- **npm (^11.4.1)** --> Node Package Manager (npm), it is the default package manager for *Node.js*, adapts packages of code for the app, run packages without dowloading. Commonly, it is used through the CLI 

- **react-router-dom (^7.6.1)** --> it facilitates client-side routing, allowing the users jump between web pages without a full page reaload. Usually, it is quite relevant for handling routes that share common layout (React Router, 2025)[^7]


### Development Dependencies


## Hardware Requirements


## Comparisons to alternative technology choices


## Purposes of chosen technologies


## Licensing of chosen technologies


## References 

[^1]: Airbnb, JavaScript 2025 on GitHub, *Airbnb JavaScript Style Guide*, accessed on 10 May 2025, https://github.com/airbnb/javascript

[^2]: Joi, 2025, *Joi Documentation*, accessed on 01 June 2025, https://joi.dev/api/?v=17.13.3

[^3]: npm, 2023, *jwt-decode*, accessed on 01 June 2025, https://www.npmjs.com/package/jwt-decode

[^4]: React, 2025, *React, The library for web and native user interface*, accessed on 01 June 2025, https://react.dev/

[^5]: React, 2025, *React DOM APIs*, accessed on 01 June 2025, https://react.dev/reference/react-dom

[^6]: npm, 2023, *react-responsive*, accessed on 06 June 2025, https://www.npmjs.com/package/react-responsive

[^7]: React Router, 2025, *REACT ROUTER*, accessed on 01 June 2025, https://reactrouter.com/