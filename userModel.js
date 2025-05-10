import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true },
    password: {type:String, required:true},
    gender: {type:String, default:"Not selected"},
    dob: {type:String, default:"Not selected"},
    phone: {type:String, default:"07xxxxxxxx"},
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }]
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel