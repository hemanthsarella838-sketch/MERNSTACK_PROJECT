const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* Voter Register */

router.post("/register",async(req,res)=>{

const user = new User(req.body);

await user.save();

res.json({message:"✅ Voter Registered Successfully"});

});

/* Voter Login */

router.post("/login",async(req,res)=>{

const {voterId,password}=req.body;

const user = await User.findOne({voterId,password});

if(user){

res.json({message:"✅ Login Successful", userId: user._id});

}
else{

res.json({message:"❌ Invalid Login Details"});

}

});

module.exports = router;