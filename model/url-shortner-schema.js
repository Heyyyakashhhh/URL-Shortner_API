const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const controller = require('../controller/controller')


//desgin scehma here
const urlSchema  = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
         type:String,
         required :[true,"Password should be at least 6 characters"],
         minlength:[6,"password is too short"]
    },

    shortURL:{
        type:String,
       
    },

    orignalURL:{
        type:String
    }
});

//password hash here
urlSchema.pre("save", async function(next){
    if(this.isModified("password")){
       this.password = await bcrypt.hash(this.password , 10);
    }

    next();
})

//matching function desgin here
urlSchema.methods.matchPassword = async function(password) {
  
    return await bcrypt.compare(password, this.password);
}


//genrate token here
urlSchema.methods.generateToken = async function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
}

//contect to the model
const Urlmodel = mongoose.model('Urlmodel' , urlSchema);


module.exports=Urlmodel;