# URL Shortening API

## Project Overview

This project implements a URL shortening API using Node.js, Express.js, and Mongoose. The API provides functionalities for user registration, login, and URL shortening. Here's a brief overview:

- **User Authentication:** Users can register and log in securely. Passwords are hashed using bcrypt for enhanced security.

- **Token Management:** JSON Web Tokens (JWT) are utilized for user authentication, and the tokens are stored securely as cookies.

- **URL Shortening:** Long URLs are shortened using the shortid npm package, providing users with a concise and shareable alternative.

## How to Use

To interact with the API, follow these steps:

1. **Registration:**
   - Use the registration endpoint to create a new user: [https://url-shortner-api-fc6c.onrender.com/registration](https://url-shortner-api-fc6c.onrender.com/registration).

2. **Login:**
   - Log in using the login endpoint: [https://url-shortner-api-fc6c.onrender.com/login](https://url-shortner-api-fc6c.onrender.com/login).
   - After a successful login, the response will include a message indicating success and a short URL. To automatically redirect to the original URL, use the following link:
     ```plaintext
     http://localhost:4000/user/checkURL/<automatically add here after login >
     ```
     Replace `<your-short-url>` with the short URL provided in the login response.

## Note

This API is designed for use with Postman or other API testing tools. To test the registration and login functionalities, make requests using the provided deployment links.

## 🚀 About Me
I'm a full stack developer...


# Hi, I'm Akash maurya! 👋


## 🔗 Links

[![linkedin](https://www.linkedin.com/in/akash-maurya-034421245/)](https://www.linkedin.com/)

