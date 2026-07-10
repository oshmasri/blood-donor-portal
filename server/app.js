const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Blood Donor Portal API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});