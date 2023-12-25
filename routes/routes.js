const express = require('express');
const route = express.Router(); 

//import controlle here
const  registration  = require('../controller/controller');
const  login  =  require('../controller/controller');
const  checkURL  =  require('../controller/controller');


//post and get request here
route.post('/registration', registration.registration);
route.post('/login', login.login);
route.get('/:shortURL', checkURL.checkURL);  

module.exports = route;
