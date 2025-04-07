const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel');

// Recommendation Route
router.get('/recommendations', async (req, res) => {
    try {
        const { businessField, fundingRange, location } = req.query;

        if (!businessField || !fundingRange || !location) {
            return res.status(400).json({ message: "Missing required query parameters." });
        }

        const businessFields = businessField.split(',').map(field => field.trim().toLowerCase());
        const investorFundingRange = Number(fundingRange);

        const posts = await Post.find({});

        const scoredPosts = posts.map(post => {
            let score = 0;

            // Convert fields to lowercase for case-insensitive comparison
            const postBusinessField = post.business_field.toLowerCase();
            const postLocation = post.location.toLowerCase();

            // Check each criterion and update score
            if (businessFields.includes(postBusinessField)) score++;
            if (post.funding_range <= investorFundingRange) score++;
            if (postLocation === location.toLowerCase()) score++;

            return { ...post._doc, score };
        });

        // Sort posts by score and then by upvotes
        const sortedPosts = scoredPosts.sort((a, b) => b.score - a.score || b.upvotes - a.upvotes);

        res.status(200).json(sortedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
