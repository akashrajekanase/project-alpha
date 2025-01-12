// server/scripts/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const admin = new Admin({
            email: 'admin@example.com',
            password: 'yourpassword'
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();