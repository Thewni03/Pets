import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the user
    name: { type: String, required: true },
    type: { type: String, required: true }, // Example: Dog, Cat, Rabbit, etc.
    breed: { type: String, default: "Unknown" },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    vaccinated: { type: Boolean, default: false },
    medicalHistory: [{ type: String }], // Array for health issues, vaccinations, etc.
}, { timestamps: true });

const petModel = mongoose.models.pet || mongoose.model("pet", petSchema);

export default petModel;