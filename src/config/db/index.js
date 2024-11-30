const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected successfully');
        return Promise.resolve();
    } catch (err) {
        console.log('Connection failed', err);
        return Promise.reject(err);
    }
}

module.exports = { connect };
