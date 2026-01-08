import ticketModel from "../models/ticketModel.js";

// Create Ticket (User)
const createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    const ticket = await ticketModel.create({
      user: req.user.id,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: ticket
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get All Tickets (Admin)
const getTickets = async (req, res) => {
    try {
      const tickets = await ticketModel.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
  
      res.json({
        success: true,
        count: tickets.length,
        data: tickets
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };

// Respond to Ticket (Admin)
const respondToTicket = async (req, res) => {
    try {
      const ticket = await ticketModel.findById(req.params.id);
  
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        });
      }
  
      ticket.responses.push({
        from: 'admin',
        message: req.body.message
      });
  
      if (ticket.status === 'open') {
        ticket.status = 'in-progress';
      }
  
      await ticket.save();
  
      res.json({
        success: true,
        data: ticket
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };

// Resolve Ticket (Admin)
const resolveTicket = async (req, res) => {
    try {
      const ticket = await ticketModel.findByIdAndUpdate(
        req.params.id,
        { status: 'resolved' },
        { new: true }
      );
  
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        });
      }
  
      res.json({
        success: true,
        data: ticket
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };

  

  const getMyTickets = async (req, res) => {
    try {
      const tickets = await ticketModel.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.json({ success: true, data: tickets });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  const getTicket = async (req, res) => {
    try {
      const ticket = await ticketModel.findById(req.params.id)
        .populate('user', 'name email');
      
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Check if user is admin or ticket owner
      if (req.user.role !== 'admin' && ticket.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
  
      res.json(ticket);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

export { createTicket, getTickets, respondToTicket, resolveTicket, getMyTickets, getTicket };       