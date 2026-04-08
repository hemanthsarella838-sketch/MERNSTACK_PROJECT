const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Candidate = require("../models/Candidate");

/* Admin Register */
router.post("/register", async(req,res)=>{
    const admin = new Admin(req.body);
    await admin.save();
    res.json({message:"✅ Admin Registered Successfully"});
});

/* Admin Login */
router.post("/login", async(req,res)=>{
    const {username,password}=req.body;
    const admin = await Admin.findOne({username,password});

    if(admin){
        res.json({message:"✅ Admin Login Successful", adminId: admin._id});
    } else {
        res.status(401).json({message:"❌ Invalid Admin Credentials"});
    }
});

/* Add Candidate */
router.post("/add-candidate", async(req,res)=>{
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.json({message:"✅ Candidate Added Successfully", candidate});
    } catch(err) {
        res.status(500).json({message:"❌ Error recording candidate", error: err});
    }
});

/* Update Candidate */
router.put("/update-candidate/:id", async(req,res)=>{
    try {
        const {name, party} = req.body;
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, {name, party}, {new: true});
        if(candidate) {
            res.json({message:"✅ Candidate Updated Successfully", candidate});
        } else {
            res.status(404).json({message:"❌ Candidate not found"});
        }
    } catch(err) {
        res.status(500).json({message:"❌ Error updating candidate", error: err});
    }
});

/* Delete Candidate */
router.delete("/delete-candidate/:id", async(req,res)=>{
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if(candidate) {
            res.json({message:"✅ Candidate Deleted Successfully"});
        } else {
            res.status(404).json({message:"❌ Candidate not found"});
        }
    } catch(err) {
        res.status(500).json({message:"❌ Error deleting candidate", error: err});
    }
});

module.exports = router;