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

// const invoicesData = [
//     {
//         id: 'IN-43890027',
//         date: '2026-03-25',
//         status: 'Paid',
//         price: '£1650.00',
//         pdfUrl: 'assets/pdfs/IN-43890027 HFA - DBA Worksheet Portal app.hfa-portal.com - Interserver.pdf',
//         dueDate: '2026-03-25'
//     },
//     {
//         id: 'IN-50938172',
//         date: '2026-03-25',
//         status: 'Paid',
//         price: '£3300.00',
//         pdfUrl: 'assets/pdfs/IN-50938172  HFA - DBA Worksheet Portal 2 - Interserver.pdf',
//         dueDate: '2026-03-25'
//     }
// ];

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
        // const sampleInvoices = invoicesData.map(invoice => {
        //     return { ...invoice, userId: adminUser };
        // });

        // await Invoice.insertMany(sampleInvoices);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
