const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        type: Date, // changed from String to Date
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Num: {
        type: String, // changed from Number to String for phone number
        required: true,
    }
});

module.exports = mongoose.model("UserModel", userSchema);
