const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
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

module.exports = mongoose.model('pdfdetails', pdfSchema);
