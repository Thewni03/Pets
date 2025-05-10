import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    pdf: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    }
});

const uploadModel = mongoose.models.pdfdetails || mongoose.model('pdfdetails', pdfSchema)

export default uploadModel

