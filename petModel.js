import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the user
    Petname: {
        type: String,
        required: true,
    },
    Species: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Breed: {
        type: String,
        required: true,
    },
    Bday: {
        type: Date, // <-- changed from String to Date
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Num: {
        type: Number,
        required: true,
    }

});

const petModel = mongoose.models.pet || mongoose.model("pet", petSchema);

export default petModel;