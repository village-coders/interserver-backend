const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets, getAllTickets, replyTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createTicket);
router.get('/', protect, getMyTickets);
router.get('/all', protect, getAllTickets);
router.post('/:id/reply', protect, replyTicket);

module.exports = router;
