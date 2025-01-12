const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

const cookieParser = require('cookie-parser');

// Add cookie parser middleware
app.use(cookieParser());

// Add auth routes
app.use('/api/auth', require('./routes/authRoutes'));