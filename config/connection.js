const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected successfully'))
.catch((err)=> console.log("Mongodb connection failed",err));

const db = mongoose.connection;
module.exports = db;