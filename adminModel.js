import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
}, { timestamps: true });  // Added timestamps for created/updated tracking

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;