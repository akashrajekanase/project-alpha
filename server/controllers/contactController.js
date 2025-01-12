const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create transporter outside the function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Controller functions
const contactController = {
    // Submit contact form
    submitContact: async (req, res) => {
        try {
            const { name, email, message } = req.body;

            // Save to database
            const contact = new Contact({
                name,
                email,
                message
            });
            await contact.save();

            // Send email notification
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `New Contact Form Submission from ${name}`,
                text: `
                    Name: ${name}
                    Email: ${email}
                    Message: ${message}
                `
            });

            res.status(201).json({ 
                success: true, 
                message: 'Contact form submitted successfully' 
            });
        } catch (error) {
            console.error('Contact submission error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error submitting contact form' 
            });
        }
    },

    // Get all contacts (for admin)
    getAllContacts: async (req, res) => {
        try {
            const contacts = await Contact.find().sort('-date');
            res.json({
                success: true,
                data: contacts
            });
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching contacts'
            });
        }
    }
};

module.exports = contactController;