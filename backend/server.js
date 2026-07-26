require("dotenv").config();
const { connectDB } = require("./config/db");


const express = require("express");
const cors = require("cors");

const sectionsRoute = require("./routes/sections");
const ipcRoute = require("./routes/ipc");
const bnsRoute = require("./routes/bns");
const searchRoute = require("./routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/sections", sectionsRoute);
app.use("/ipc", ipcRoute);
app.use("/bns", bnsRoute);
app.use("/search", searchRoute);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 NyaySahayak Backend Running...");
});

// Server Port

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(err);
    }
}

startServer();