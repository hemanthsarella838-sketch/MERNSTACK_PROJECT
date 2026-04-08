const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const voteRoutes = require("./routes/voteRoutes");

const app = express();

/* Middleware */

app.use(cors());
app.use(bodyParser.json());

/* Connect Database */

connectDB();

/* Home Route */

app.get("/", (req, res) => {
    res.send("🚀 Online Voting Backend Server Running Successfully");
});

/* Test Routes */

app.get("/user", (req, res) => {
    res.send("User API is working");
});

app.get("/admin", (req, res) => {
    res.send("Admin API is working");
});

app.get("/vote", (req, res) => {
    res.send("Vote API is working");
});

/* Actual API Routes */

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/vote", voteRoutes);

/* Server */

app.listen(5001, () => {
    console.log("🚀 Server Running on http://localhost:5001");
});