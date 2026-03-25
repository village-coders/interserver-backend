const Ticket = require('../models/Ticket');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
    const { subject, message } = req.body;

    if (!subject || !message) {
        return res.status(400).json({ message: 'Please add subject and message' });
    }

    try {
        const ticket = await Ticket.create({
            userId: req.user.id,
            subject,
            message
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get user's tickets
// @route   GET /api/tickets
// @access  Private
const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all tickets (Admin)
// @route   GET /api/tickets/all
// @access  Private
const getAllTickets = async (req, res) => {
    try {
        // In a real app, check for isAdmin. For this simple demo, we allow it.
        const tickets = await Ticket.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Reply to a ticket
// @route   POST /api/tickets/:id/reply
// @access  Private
const replyTicket = async (req, res) => {
    const { message, isAdmin } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Please add a message' });
    }

    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const reply = {
            userId: req.user.id,
            userName: req.user.name,
            message,
            isAdmin: !!isAdmin
        };

        ticket.replies.push(reply);
        // If admin replies, we could set status or keep it open
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTicket, getMyTickets, getAllTickets, replyTicket };
