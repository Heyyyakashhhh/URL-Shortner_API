const express = require('express');
const session = require('session')
require('dotenv').config()
const app = express();
const db = require('./config/connection');
const route = require('./routes/routes')
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/' , (req,res)=>{
    return res.send("Welocome to the URL-Shortner-API now go to postman and check API")
},  route)

app.listen(port , (req,res)=>{
    
    console.log(`server listen at ${port}`)
})
