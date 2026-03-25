const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// Serve static frontend files from 'public' folder (one level up from /api)
// app.use(express.static(path.join(__dirname, '../public')));

// Fallback to index.html for unknown frontend routes
app.get('*', (req, res) => {
    res.send("Hello World");
});

// Start Server
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;