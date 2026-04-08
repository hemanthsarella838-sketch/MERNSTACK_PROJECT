const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

name:String,
email:String,
voterId:String,
password:String,
voted:{type:Boolean,default:false}

});

module.exports = mongoose.model("User",UserSchema);