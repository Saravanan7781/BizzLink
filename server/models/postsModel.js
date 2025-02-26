const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:[true, "User ID is required"]
    },
    post_image: {
        type:String,
    },
    upvotes: {
        type: Number,
        default:0
    },
    post_title: {
         type: String,
        required:[true, "Post title is required"]
    },
    post_desc: {
        type: String,
        required:[true, "Post description is required"]
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('posts', postsSchema);