import petModel from "../models/petModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
// import multer from 'multer';
// import fs from 'fs';
// import imgModel from "../models/imgModel.js";

// Multer configuration for images
// const imgStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Create uploads directory if it doesn't exist
//         if (!fs.existsSync('./uploads/petUploads')) {
//             fs.mkdirSync('./uploads/petUploads');
//         }
//         cb(null, './uploads/petUploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     }
// });

// export const imgUpload = multer({ storage: imgStorage });

//Add a pet
export const addPet = async (req, res) => {
    try {
        
        const { userId, Petname, Species, Age, Gender, Breed, Bday, Address, Num } = req.body;
        
        if (!Petname || !Species || !Age || !Gender || !Breed || !Bday || !Address || !Num) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // 3. Create pet with proper data types
        const newPet = new petModel({ 
            owner: userId, 
            Petname, 
            Species, 
            Age: Number(Age), // Ensure number
            Gender,
            Breed,
            Bday: new Date(Bday), // Convert string to Date
            Address,
            Num: Number(Num) // Consider changing model to String
        });

        const savedPet = await newPet.save();
        console.log("Pet saved with ID:", savedPet._id);

         // 2. Then update the user
         await userModel.findByIdAndUpdate(
            userId, 
            { $push: { pets: savedPet._id } },
            { new: true } // Return the updated document if needed
        );
        console.log("User updated with new pet reference");

        return res.status(201).json({ success: true, message: "Pet added successfully", pet: newPet });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding pet", error: error.message });
    }
};

//Get all pets for a user
export const getUserPets = async (req, res) => {
    try {
        //const userId = req.user._id;
        const { userId } = req.body
        const pets = await petModel.find({ owner: userId });

        res.status(200).json({ success: true, pets });

    } catch (error) {
        console.error("Error fetching pets:", error)
        res.status(500).json({ success: false, message: "Error fetching pets", error });
    }
};

//Update pet details
// export const updatePet = async (req, res) => {
//     try {
//         const { petId } = req.params;
//         const updatedData = req.body;

//         if (!petId || !mongoose.Types.ObjectId.isValid(petId)) {
//             return res.status(400).json({ success: false, message: "Invalid pet ID" });
//         }

//         const pet = await petModel.findByIdAndUpdate(petId, updatedData, { new: true });

//         if (!pet) {
//             return res.status(404).json({ success: false, message: "Pet not found" });
//         }

//         res.status(200).json({ success: true, message: "Pet updated successfully", pet });

//     } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ success: false, message: "Error updating pet", error: error.message });
//     }
// };


// export const getImages = async (req, res) => {
//     try {
//         const data = await imgModel.find({});
//         res.send({ status: "ok", data: data });
        
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// };

export const updatePet = async (req, res) => {
    try {
        const { petId } = req.params;
        let updatedData = req.body;

        // Validate petId
        if (!petId || !mongoose.Types.ObjectId.isValid(petId)) {
            return res.status(400).json({ success: false, message: "Invalid pet ID" });
        }

        // Convert date string to Date object if it exists
        if (updatedData.Bday) {
            updatedData.Bday = new Date(updatedData.Bday);
            // Validate the date
            if (isNaN(updatedData.Bday.getTime())) {
                return res.status(400).json({ success: false, message: "Invalid date format" });
            }
        }

        // Convert other numeric fields
        if (updatedData.Age) updatedData.Age = Number(updatedData.Age);
        if (updatedData.Num) updatedData.Num = Number(updatedData.Num);

        const pet = await petModel.findByIdAndUpdate(
            petId, 
            updatedData, 
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Pet updated successfully", 
            pet 
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error updating pet", 
            error: error.message,
            stack: error.stack // Include stack trace for debugging
        });
    }
};

//Delete a pet
export const deletePet = async (req, res) => {
    try {
        const { petId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return res.status(400).json({ success: false, message: "Invalid pet ID format" });
        }

        const pet = await petModel.findByIdAndDelete(petId);

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        // Remove pet from user's pet list (optional)
        await userModel.findByIdAndUpdate(pet.owner, { $pull: { pets: petId } });

        res.status(200).json({ success: true, message: "Pet deleted successfully" });

    } catch (error) {
        console.error("Delete error details:", error);
        res.status(500).json({ success: false, message: "Error deleting pet", error });
    }
};



// Get pet by ID
export const getById = async (req, res) => {
    const { petId } = req.params;
    try {
        
        const pet = await petModel.findById(petId);
        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }
        return res.status(200).json({ success: true, pet });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Failed to fetch pet by ID" });
    }
};

// Controller functions
// export const uploadImage = async (req, res) => {
//     try {
//         const imageName = req.file.filename;
        
//         await imgModel.create({ image: imageName });
//         res.json({ status: "ok", image: imageName });
        

//     } catch (error) {
//         res.status(500).json({  status: "error", message: error.message });
//     }
// };



// export const deleteImage = async (req, res) => {
//     try {
//         const image = await imgModel.findById(req.params.id);
//         if (!image) {
//             return res.status(404).json({ status: "Image not found" });
//         }

//         // Delete file from uploads folder
//         const filePath = `./uploads/petUploads/${image.image}`;
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }

//         // Delete from database
//         await imgModel.findByIdAndDelete(req.params.id);
//         res.json({ status: "ok" });
        
//     } catch (error) {
//         res.status(500).json({ status: error.message });
//     }
// };
