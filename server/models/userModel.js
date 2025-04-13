const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    user_image: {
        type: String
    },
    role: {
        type: String,
        enum: ['entrepreneur', 'investor'],
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    ideas: {
        type: Number,
        default: 0
    },
    domains: {
        type: String
    },
    linkedin: { 
        type: String,
        // required: [true, "linkedin URL is required"]
    }, 
    email: {
        type: String,
        unique: [true, "Please enter a unique email"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    startup: {
        type:String
    },
    img:{
        type: String,
    }
});

module.exports = mongoose.model('users', userSchema);
