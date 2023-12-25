// Import required modules and packages
const express = require('express');
const session = require('session'); // Note: It seems like there might be a typo here. It's usually 'express-session'.
require('dotenv').config(); // Load environment variables from a .env file
const app = express();
const db = require('./config/connection'); // Assuming this is your database connection setup
const route = require('./routes/routes'); // Import the routes from the 'routes' module
const cookieParser = require('cookie-parser');

// Set the port for the server to run on
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies

// Use the defined routes
app.use('/', route);

// Start the server and listen on the specified port
app.listen(port, (req, res) => {
    console.log(`Server listening at http://localhost:${port}`);
});
