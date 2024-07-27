const mongoose = require('mongoose');
require('dotenv').config();
const dburl = process.env.DB_URL;

exports.connectDb = async () => {
    try {
        await mongoose.connect(dburl);
        console.log('Connected to the database');
    } catch (error) {
        console.log('Failed to connect to the database', error);
        process.exit(1);
    }
}