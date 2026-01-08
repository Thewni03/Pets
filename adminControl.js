import adminModel from "../models/adminModel.js";
import vetModel from "../models/vetModel.js";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await adminModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching users" });
    }
};

// Insert a user
const addUser = async (req, res) => {
    try {
        const { userId, name, email, password, role, phone } = req.body;
        
        // Check if user already exists
        const existingUser = await adminModel.findOne({ $or: [{ userId }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this ID or email already exists" });
        }

        const newUser = new adminModel({ userId, name, email, password, role, phone });
        await newUser.save();
        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving the user" });
    }
};

// Get user by ID
const getById = async (req, res) => {
    try {
        const user = await adminModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching user" });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        
        const updatedUser = await adminModel.findByIdAndUpdate(
            req.params.id, // Changed to _id
            { name, email, password, role, phone },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user" });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await adminModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting user" });
    }
};

const vetVisit = async (req, res) => {
    try {
        const vets = await vetModel.find();
        return res.status(200).json({ vets }); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching vets" });
    }
}



export default {
    getAllUsers,
    addUser,
    getById,
    updateUser,
    deleteUser,
    vetVisit
};