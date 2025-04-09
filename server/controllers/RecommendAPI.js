const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel');

// Recommendation Route (POST)
router.post('/recommendations', async (req, res) => {
    try {
        const { business_field, funding_range, location } = req.body;

        if (!business_field || !funding_range || !location) {
            return res.status(400).json({ message: "Missing required fields in request body." });
        }

        // Accept both comma-separated string or array
        const businessFields = Array.isArray(business_field)
            ? business_field.map(field => field.trim().toLowerCase())
            : business_field.split(',').map(field => field.trim().toLowerCase());

        const investorFundingRange = Number(funding_range);

        const posts = await Post.find({}).lean(); // faster response

        const scoredPosts = posts.map(post => {
            let score = 0;

            const postBusinessField = post.business_field.toLowerCase();
            const postLocation = post.location.toLowerCase();

            if (businessFields.includes(postBusinessField)) score++;
            if (post.funding_range <= investorFundingRange) score++;
            if (postLocation === location.toLowerCase()) score++;

            return { ...post, score };
        });

        const sortedPosts = scoredPosts.sort((a, b) => b.score - a.score || b.upvotes - a.upvotes);

        res.status(200).json(sortedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
