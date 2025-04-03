const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  
const router = require("./Routes/VetRoutes");

const app = express();

// Middleware
app.use(cors());  
app.use(express.json());
app.use("/vets", router);  

// MongoDB connection
mongoose.connect("mongodb+srv://thewni2003:Thew123@cluster0.jk5xl.mongodb.net/vets")
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5008, () => {
            console.log("🚀 Server is running on port 5008");
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);  // Exit the process if DB connection fails
    });
