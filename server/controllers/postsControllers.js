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
const createPost = async (req, res) => {
  try {
      const {
        user_id,
      post_title,
      post_desc,
      funding_range,
      investment_stage,
      business_type,
      business_field,
      location,
      website_link,
      team_size,
      registered_entity,
    } = req.body;

      console.log(req.body);
     
    const imageUrls = req.files?.map((file) => file.path) || [];
    // Now save the post to DB (MongoDB or any)
    
      const newPostSchema = {
          user_id,
          post_title,
          post_desc,
          funding_range,
          investment_stage,
          business_type,
          business_field,
          location,
          website_link,
          team_size,
          registered_entity,
          post_images: imageUrls
      };
      const response = await PostsModel.create(newPostSchema);
      if (!response) {
        throw new Error("Post not created");
       };
      

    console.log("Created Post:", newPostSchema);

    res.status(201).json({
      message: "Post created successfully",
      post: newPostSchema,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


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