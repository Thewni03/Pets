const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const dogs = await User.find();
        if (!dogs || dogs.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ dogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Add new user
const addUsers = async (req, res, next) => {
    const { Petname, Species, Age, Gender, Breed, Bday, Address, Num } = req.body;

    if (!Petname || !Species || !Age || !Gender || !Breed || !Bday || !Address || !Num) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = new User({ Petname, Species, Age, Gender, Breed, Bday, Address, Num });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add user" });
    }
};

// Get user by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch user by ID" });
    }
};

// Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { Petname, Species, Age, Gender, Breed, Bday, Address, Num } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { Petname, Species, Age, Gender, Breed, Bday, Address, Num },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: "User not found for update" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update user" });
    }
};

// Delete user
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found for deletion" });
        }
        return res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to delete user" });
    }
};

// Export all functions
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
