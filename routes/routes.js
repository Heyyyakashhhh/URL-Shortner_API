const express = require('express');
const route = express.Router(); 

const  registration  = require('../controller/controller');
const  login  =  require('../controller/controller');
const  checkURL  =  require('../controller/controller');

route.post('/registration', registration.registration);
route.post('/login', login.login);
route.get('/:shortURL', checkURL.checkURL);  // Assuming you don't want to restrict access to this route

module.exports = route;
