const User = require("../model/UserModel");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching users" });
    }
};

// Insert a user
const addusers = async (req, res) => {
    const { userId, name, email, password, role, phone } = req.body;

    try {
        const newUser = new User({ userId, name, email, password, role, phone });
        await newUser.save();
        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving the user" });
    }
};
//get by id 
const getById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ userId: userId });  // Find by userId, not by MongoDB's _id
        if (!user) {
            return res.status(404).json({ message: "Unable to find user" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching user" });
    }
};



// Update user details// Update user details
const updateUser = async (req, res) => {
    const userId = req.params.userId;  // Extract userId from params
    const { userId: newUserId, name, email, password, role, phone } = req.body; // New data

    try {
        console.log(`Attempting to update user with userId: ${userId}`);

        // Find and update the user by userId
        const updatedUser = await User.findOneAndUpdate(
            { userId: userId }, // Use userId to find the user
            { userId: newUserId, name, email, password, role, phone }, // Data to update
            { new: true } // Ensure the updated document is returned
        );

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to update user" });
        }

        console.log("Updated user:", updatedUser);
        return res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user" });
    }
};


// Delete user
const deleteUser = async (req, res) => {
    const id = req.params.userId; // Fixed variable name

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting user" });
    }
};


exports.getAllUsers = getAllUsers;
exports.addusers = addusers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
