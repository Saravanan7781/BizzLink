const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const searchAllRecommendedUsers = asyncHandler(async (req, res) => {
    const searchQuery = req.query.name;
    // console.log(searchQuery);
    const regex = new RegExp(searchQuery, 'i');
    const response = await userModel.find({
        username: {
        $regex: regex,
    }}).select('username followers upvotes img');
    if (!response) {
        res.status(404);
        res.json()({ message: "No users found" });
    }
    res.json(response);
});

module.exports = searchAllRecommendedUsers;