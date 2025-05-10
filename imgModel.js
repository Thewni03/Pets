import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
    image: {
        type: String, 
        required: true,
    },
    userId: {  // Add this field to track ownership
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user' // Assuming you have a User model
    }
});

const imgModel = mongoose.models.img || mongoose.model('img', imgSchema);
export default imgModel;