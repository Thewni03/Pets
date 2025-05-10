import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);