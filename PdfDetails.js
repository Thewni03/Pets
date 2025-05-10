import mongoose from 'mongoose';

const PdfDetailsSchema = new mongoose.Schema({
  title: String,
  pdf: String
}, { timestamps: true });

export default mongoose.model("PdfDetails", PdfDetailsSchema);