const expressAsyncHandler = require('express-async-handler');
const PostsModel= require('../models/postsModel');

const getAllPosts = expressAsyncHandler(async(req, res) => {

    const responses = await PostsModel.find({});
    res.status(200).json(
        responses
    );
});

const getSinglePost = expressAsyncHandler(async(req, res) => {
    const response = await PostsModel.find({user_id:req.params.id});
    if (!response) {
        res.status(404);
        throw new Error("Post not found");
    }
    res.status(200).json(
        {
            response
         }
    );
});

const createPost = expressAsyncHandler(async (req, res) => {
    const {post_image, post_title, post_desc } = req.body;
    
    if (!post_title || !post_desc) {
        // console.log("asdasdasdsad");
        res.status(400);
        throw new Error("All fields are required");
    }

    const response = await PostsModel.create({
        "user_id": req.user.id,
        "post_title": post_title,
        "post_image":post_image,
        "post_desc": post_desc,
    });

    res.json({
        "message": "Created new Post",
         response
    }
    );
});

const editPost = expressAsyncHandler(async(req, res) => {
    const response = await PostsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!response) {
        res.status(404);
        throw new Error("Cannot edit post check the id");
    }
    res.status(200).json(
        {
            "message": `Edit post for ${req.params.id}`,
            response
        }
    );
});

const deletePost = expressAsyncHandler(async(req, res) => {
    const response = await PostsModel.findByIdAndDelete(req.params.id);
    if (!response) {
        res.status(404);
        throw new Error("Cannot delete post check the id");
    }

    res.status(200).json(
        {
            "message": `Delete post for ${req.params.id}`,
            response
         }
    );
});

module.exports = {getAllPosts,getSinglePost,editPost,deletePost,createPost};