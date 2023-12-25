const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const controller = require('../controller/controller')

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
urlSchema.pre("save", async function(next){
    if(this.isModified("password")){
       this.password = await bcrypt.hash(this.password , 10);
    }

    next();
})

urlSchema.methods.matchPassword = async function(password) {
  
    return await bcrypt.compare(password, this.password);
}

urlSchema.methods.generateToken = async function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
}

const Urlmodel = mongoose.model('Urlmodel' , urlSchema);


module.exports=Urlmodel;