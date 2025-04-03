const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vetSchema = new Schema({
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

module.exports = mongoose.model(
    "Vet",//file name
    vetSchema //function name
)
