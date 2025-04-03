require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import routes from both projects
const userRouter = require("./routes/UserRoutes");   // Your project routes
const vetRouter = require("./routes/VetRoutes");     // Your friend's project routes

// Create express app
const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Allow handling JSON requests
app.use("/users", userRouter);  // Your project user routes
app.use("/vets", vetRouter);    // Your friend's vet routes
app.use("/files", express.static("files"));  // Serve uploaded files

// MongoDB Connections for Both Databases
// MongoDB URI for your project
const mongoURI1 = process.env.MONGO_URI;  // Your database URI
// MongoDB URI for your friend's project (vet database)
const mongoURI2 = "mongodb+srv://thewni2003:Thew123@cluster0.jk5xl.mongodb.net/vets";

// Connect to both MongoDB databases
mongoose.connect(mongoURI1)
    .then(() => {
        console.log("✅ Connected to Your MongoDB");
        return mongoose.createConnection(mongoURI2);
    })
    .then(() => {
        console.log("✅ Connected to Vets MongoDB");
        app.listen(5008, () => {
            console.log("🚀 Server is running on port 5008");
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);  // Exit the process if DB connection fails
    });

// AI Configuration (as per your original backend)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// AI Route for Generating Diet Plan (Your functionality)
app.post("/generate-diet-plan", async (req, res) => {
    try {
        const { species, breed, weight_kg, age_years } = req.body;

        if (!species || !breed || !weight_kg || !age_years) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const prompt = `Generate a structured diet plan for a ${species}, breed ${breed}, weight ${weight_kg}kg, and age ${age_years} years in JSON format.`;

        const result = await model.generateContent(prompt);
        console.log("Full AI Response:", result);

        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) {
            console.error("Invalid AI response:", result);
            return res.status(500).json({ error: "AI did not return a valid response" });
        }

        const content = result.response.candidates[0].content;
        console.log("AI Content:", content);

        let dietPlan;
        if (typeof content === 'string') {
            const jsonRegex = /```json\n([\s\S]*?)\n```/;
            const match = content.match(jsonRegex);

            if (match && match[1]) {
                try {
                    dietPlan = JSON.parse(match[1]);
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    return res.status(500).json({ error: "Failed to parse AI response" });
                }
            } else {
                try {
                    dietPlan = JSON.parse(content);
                } catch (parseError){
                    console.error("JSON parse error:", parseError);
                    return res.status(500).json({ error: "Failed to parse AI response" });
                }
            }
            res.status(200).json({ diet_plan: dietPlan });
        } else if (typeof content === 'object') {
            res.status(200).json({ diet_plan: content });
        } else {
            console.error("Unexpected content format:", content);
            res.status(500).json({ error: "Unexpected content format from AI" });
        }

    } catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PDF Upload Configuration (Shared functionality)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// PDF Upload Route
app.post("/uploadfile", upload.single("file"), async (req, res) => {
    const title = req.body.title;
    const pdf = req.file.filename;

    try {
        await mongoose.model("pdfdetails").create({ title, pdf });
        console.log("PDF uploaded");
        res.send({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});

// Get Uploaded PDFs Route
app.get("/getFile", async (req, res) => {
    try {
        const data = await mongoose.model("pdfdetails").find({});
        res.send({ status: 200, data });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});
