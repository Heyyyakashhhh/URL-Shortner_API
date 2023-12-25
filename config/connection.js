const mongoose = require('mongoose');
require('dotenv').config()
//mongose connect here 
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected successfully'))
.catch((err)=> console.log("Mongodb connection failed",err));

//connection export here
const db = mongoose.connection;
module.exports = db;