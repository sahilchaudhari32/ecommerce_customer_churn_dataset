const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Attempting to connect to:', process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@'));
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Detailed Error:', err);
        process.exit(1);
    }
};

testConnection();
