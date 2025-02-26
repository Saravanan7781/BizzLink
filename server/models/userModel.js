const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true, "Username is required"]
    },
    user_image: {
        type: String
    },
    role: {
        type: String,
        required:[true, "Role is required"]
    },
    upvotes: {
        type: Number,
        default:0
    },

    followers: {
        type: Number,
        default:0
    },

    ideas: {
        type: Number,
        default:0
    },

    domains: {
        type: String,
        required:[true, "Domains is required"]
    },

    email: {
        type: String,
        unique: [true,"Please enter a unique email"],
        required:[true, "Email is required"]
    },

    password: {
       type: String,
        required:[true, "Password is required"]
    }
})

module.exports = mongoose.model('users', userSchema);