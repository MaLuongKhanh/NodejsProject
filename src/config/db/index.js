const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected successfully');
    } catch (err) {
        console.log('Connection failed', err);
    }
}

module.exports = { connect };
