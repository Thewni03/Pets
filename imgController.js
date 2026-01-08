import multer from "multer";
import imgModel from "../models/imgModel.js";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });

export const uploadImg = async (req, res) => {
  try {
    const imageName = req.file.filename;
    console.log("Uploading file:", imageName); // Add this
    await imgModel.create({ 
        image: imageName,
        userId: req.userId // From authUser middleware
      });
    console.log("Created record:", newImage); // Add this
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Upload error:", error);
    res.json({ status: error });
  }
};

export const getImage = async (req, res) => {
    try {
        const data = await imgModel.find({ userId: req.userId });
        console.log("Database query results:", data);
        res.send({ status: "ok", data });
    } catch (error) {
        res.json({ status: error });
    }
};


export const deleteImage = async (req, res) => {
    try {
        const image = await imgModel.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!image) {
            return res.status(404).json({ status: "Image not found or not authorized" });
        }

        // Delete file from uploads folder
        const filePath = `./uploads/${image.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        await imgModel.findByIdAndDelete(req.params.id);
        res.json({ status: "ok" });

    } catch (error) {
        res.status(500).json({ status: error.message });
    }
}