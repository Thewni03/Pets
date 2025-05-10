import petModel from "../models/petModel.js";
import userModel from "../models/userModel.js";

//Add a pet
export const addPet = async (req, res) => {
    try {
        const { userId, name, type, breed, age, gender, vaccinated, medicalHistory } = req.body;
        // const userId = req.user.id;

        if (!name || !type) {
            return res.status(400).json({ success: false, message: "Name and type are required" });
        }

        const newPet = new petModel({ owner: userId, name, type, breed, age, gender, vaccinated, medicalHistory });
        await newPet.save();

        // Add pet ID to the user's pet list (optional)
        await userModel.findByIdAndUpdate(userId, { $push: { pets: newPet._id } });

        res.status(201).json({ success: true, message: "Pet added successfully", pet: newPet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding pet", error });
    }
};

//Get all pets for a user
export const getUserPets = async (req, res) => {
    try {
        // const userId = req.user.id;
        const { userId } = req.body
        const pets = await petModel.find({ owner: userId });

        res.status(200).json({ success: true, pets });

    } catch (error) {
        console.error("Error fetching pets:", error)
        res.status(500).json({ success: false, message: "Error fetching pets", error });
    }
};

//Update pet details
export const updatePet = async (req, res) => {
    try {
        const { petId } = req.params;
        const updatedData = req.body;

        const pet = await petModel.findByIdAndUpdate(petId, updatedData, { new: true });

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.status(200).json({ success: true, message: "Pet updated successfully", pet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating pet", error });
    }
};

//Delete a pet
export const deletePet = async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await petModel.findByIdAndDelete(petId);

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        // Remove pet from user's pet list (optional)
        await userModel.findByIdAndUpdate(pet.owner, { $pull: { pets: petId } });

        res.status(200).json({ success: true, message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting pet", error });
    }
};
