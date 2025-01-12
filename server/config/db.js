const mongoose = require('mongoose');

const connectDB = async () => {
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                // These options are no longer needed in newer versions of mongoose
                // but included for compatibility
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        }
    };

    await connectWithRetry();
};

module.exports = connectDB;