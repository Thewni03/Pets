//pass= 7AAAXNPecWdORCB8

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");
const multer = require("multer");
const fs = require('fs');

const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

mongoose.connect("mongodb+srv://admin:7AAAXNPecWdORCB8@cluster0.l4yrb.mongodb.net/pets")
.then(()=> console.log("Connected to mongoDB"))
.then(() => {
    app.listen(5001);
})
.catch((err)=> console.log((err)));

///////////
//image part
require("./Model/ImgModel");
const ImgSchema = mongoose.model("ImgModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/files', express.static('uploads'));

app.post("/uploadImg", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await ImgSchema.create({ image: imageName });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

//Displaying IMG
app.get("/getImage", async (req, res) => {
    try {
        ImgSchema.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        res.json({ status: error });
    }
});

// Delete image
app.delete("/deleteImage/:id", async (req, res) => {
    try {
        const image = await ImgSchema.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ status: "Image not found" });
        }

        // Delete file from uploads folder
        const filePath = `./uploads/${image.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        await ImgSchema.findByIdAndDelete(req.params.id);
        res.json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});