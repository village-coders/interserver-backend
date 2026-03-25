const Invoice = require('../models/Invoice');

// @desc    Get invoices for logged in user
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create new invoice based on worksheet form
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
    let { quantity } = req.body;

    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }

    let invId, pdfUrl, invPrice, dueDate;

    if (quantity === 1) {
        invId = 'IN-43890027';
        pdfUrl = 'assets/pdfs/IN-43890027 HFA - DBA Worksheet Portal app.hfa-portal.com - Interserver.pdf';
        invPrice = '£1650.00';
        dueDate = '2026-03-25';
    } else if (quantity === 2) {
        invId = 'IN-50938172';
        pdfUrl = 'assets/pdfs/IN-50938172  HFA - DBA Worksheet Portal 2 - Interserver.pdf';
        invPrice = '£3300.00';
        dueDate = '2026-03-25';
    } else {
        invId = 'IN-' + Math.floor(10000 + Math.random() * 9000000);
        pdfUrl = 'assets/pdfs/IN-99837021- interserver KFC renewals.pdf';
        invPrice = '£' + (1650 * quantity).toFixed(2);
        dueDate = '2026-10-16';
    }

    // const uniqueInvId = invId + '-' + Math.floor(1000 + Math.random() * 9000);
    const date = new Date().toISOString().split('T')[0];
    const status = 'Pending';

    try {
        const invoice = await Invoice.create({
            id: invId,
            userId: req.user.id,
            date,
            status,
            price: invPrice,
            pdfUrl,
            dueDate
        });

        res.status(201).json({
            message: 'Invoice created',
            invoice
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getInvoices, createInvoice };
