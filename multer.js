import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
    // destination: function (req, file, callback) {
    //     callback(null, "uploads/"); // Ensure this folder exists
    // },
    filename: function (req, file, callback) {
        callback(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

export default upload;


// callback(null, Date.now() + path.extname(file.originalname)); // Unique filename