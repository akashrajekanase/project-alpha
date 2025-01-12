const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.submitContact = async (req, res) => {
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
};