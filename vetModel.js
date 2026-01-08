import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
    Appointment:{
        type:String, //datatype
        required:true, //validate
    },

    Diagnosis:{
        type:String, //datatype
        required:true, //validate
    },

    treatment:{
        type:String, //datatype
        required:true, //validate
    },

    prescription:{
        type:String, //datatype
        required:true, //validate
    },

    vetId:{
        type:String, //datatype
        required:true,
    }
});

const vetModel = mongoose.models.vet || mongoose.model('vet', vetSchema)

export default vetModel
