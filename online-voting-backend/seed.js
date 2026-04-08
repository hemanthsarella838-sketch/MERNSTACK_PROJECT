const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");

const seedCandidates = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/onlineVoting");
        console.log("✅ MongoDB Connected Successfully");

        await Candidate.deleteMany();
        
        const candidates = [
            { name: "Candidate A", party: "Party X" },
            { name: "Candidate B", party: "Party Y" },
            { name: "Candidate C", party: "Party Z" }
        ];

        await Candidate.insertMany(candidates);
        console.log("✅ Database seeded with default candidates.");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedCandidates();
