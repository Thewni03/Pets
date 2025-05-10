import express from 'express';
import Ticket from '../models/ticketModel.js';
import authUser from '../middlewares/authUser.js';

const ticketrouter = express.Router();

// Create a new ticket
ticketrouter.post('/', authUser, async (req, res) => {
    try {
        const { subject, message } = req.body;
        
        if (!subject || !message) {
            return res.status(400).json({ message: 'Please provide subject and message' });
        }

        if (message.length < 10) {
            return res.status(400).json({ message: 'Message must be at least 10 characters' });
        }

        const ticket = await Ticket.create({
            subject,
            message,
            createdBy: req.user._id
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tickets for the logged-in user
ticketrouter.get('/', authUser, async (req, res) => {
    try {
        const tickets = await Ticket.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });
            
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default ticketrouter;