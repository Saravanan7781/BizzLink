const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const dbConfig = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
    });
    console.log("MongoDB connected successfully to DB:  ", connect.connection.name);
});

module.exports = { dbConfig };