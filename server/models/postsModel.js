const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:[true, "User ID is required"]
    },
    post_images: {
    type: [String], // array of image URLs
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default:[0]
    }],
    post_title: {
         type: String,
        required:[true, "Post title is required"]
    },
    post_desc: {
        type: String,
        required:[true, "Post description is required"]
    },
    funding_range: {
        type: String,
        required:[true,"Please provide funding range"]
    },
    investment_stage: { type: String, required: true, enum: ["seed", "seriesA", "seriesB"] },
    business_type: { type: String, required: true, enum: ["b2b", "b2c", "saas"] },

    business_field: {
        type:String
    },
    location: {
        type:String
    },
    website_link: {
        type: String
    },
    team_size: { 
        type: Number, required: true 
    },
    registered_entity: {
         type: Boolean, default: false 
    }


}, {
    timestamps: true
});

module.exports = mongoose.model('posts', postsSchema);