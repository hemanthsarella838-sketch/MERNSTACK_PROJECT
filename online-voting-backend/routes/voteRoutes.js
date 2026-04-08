const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require("../models/User");

/* Cast Vote */

router.post("/vote",async(req,res)=>{

const {candidateId,userId}=req.body;

const user = await User.findById(userId);

if(user.voted){

return res.json({message:"❌ You Already Voted"});

}

await Candidate.findByIdAndUpdate(candidateId,{
$inc:{votes:1}
});

user.voted=true;
await user.save();

res.json({message:"✅ Vote Cast Successfully"});

});

/* View Results */

router.get("/results",async(req,res)=>{

const candidates = await Candidate.find();

res.json(candidates);

});

module.exports = router;