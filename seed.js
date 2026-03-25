const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Invoice = require('./models/Invoice');

dotenv.config();

const users = [
    {
        name: 'Halal Food Authority',
        email: 'ict@halalfoodauthority.com',
        password: 'halal123'
    },
    {
        name: 'Halal Food Authority',
        email: 'hfaportal@halalfoodauthority.com',
        password: '@Moses2022'
    }
];

const invoicesData = [
    { id: 'IN-4730037', date: '2025-10-16', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4730037 HFAKFC - DBA Worksheet Portal Renewals - Interserver.pdf', dueDate: '2025-10-16' },
    { id: 'IN-4730029', date: '2025-10-16', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4730029 HFA - DBA Worksheet Portal Renewals - Interserver.pdf', dueDate: '2025-10-16' },
    { id: 'IN-4890037', date: '2024-10-25', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4890037 HFA - NEW DBA Worksheet Portal 2.pdf', dueDate: '2024-10-25' },
    { id: 'IN-4730038', date: '2025-10-16', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4730037 HFAKFC - DBA Worksheet Portal Renewals - Interserver.pdf', dueDate: '2025-10-16' },
    { id: 'IN-4730030', date: '2025-10-16', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4730029 HFA - DBA Worksheet Portal Renewals - Interserver.pdf', dueDate: '2025-10-16' },
    { id: 'IN-4890039', date: '2024-10-25', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-4890037 HFA - NEW DBA Worksheet Portal 2.pdf', dueDate: '2024-10-25' },
    { id: 'IN-739039334', date: '2023-08-21', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-739039334 August intersrver 1.pdf', dueDate: '2023-08-21' },
    { id: 'IN-99837002', date: '2023-06-02', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/JUNE 2023- interserver export cert 1.pdf', dueDate: '2023-06-02' },
    { id: 'IN-99837021', date: '2023-03-10', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-99820830- interserver STAFF PORTAL.pdf', dueDate: '2023-03-10' },
    { id: 'IN-99837022', date: '2023-04-01', status: 'Paid', price: '£1650.00', pdfUrl: 'assets/pdfs/IN-99837021- interserver KFC renewals.pdf', dueDate: '2023-04-01' },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interserver');

        // Clear existing data
        await User.deleteMany();
        await Invoice.deleteMany();

        // Create user
        const createdUsers = await User.create(users);
        const adminUser = createdUsers[0]._id;

        // Create invoices with user ID
        const sampleInvoices = invoicesData.map(invoice => {
            return { ...invoice, userId: adminUser };
        });

        await Invoice.insertMany(sampleInvoices);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
