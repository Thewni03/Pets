const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true, 
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "vet", "rescue_center", "pet_owner"], 
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("UserModel", UserSchema); 