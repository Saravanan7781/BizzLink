const expressAsyncHandler = require('express-async-handler');
const PostsModel= require('../models/postsModel');
const UserModel = require('../models/userModel');
const postsModel = require('../models/postsModel');
const mongoose = require('mongoose');

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
          upvotes:[],
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

const setImageForUser = expressAsyncHandler(async (req, res) => {
    // console.log("called successfully");
    // console.log(req.body);
    // console.log(req.file);
    const { user_id } = req.body;
    const imageUrl = req.file.path;
    // console.log("image url", imageUrl);
    const response = await UserModel.findByIdAndUpdate(user_id, { img: imageUrl }, { new: true });
    if (!response) {
        res.status(404);
        throw new Error("Cannot set image for user check the id");
    }
    res.status(200).json(
        {
            response: response.img
        }
    );
})


const userBioData = expressAsyncHandler(async (req, res) => {
    const { user_id } = req.body;
        const newObjectUserId = new mongoose.Types.ObjectId(user_id);
       const stats = await postsModel.aggregate([
        { $match: { user_id : newObjectUserId } }, // Match posts by the user

        { $addFields: { upvoteCount: { $size: "$upvotes" } } }, // Add a field for count

        {
            $group: {
                _id: "$user_id",
                total_ideas: { $sum: 1 },
                total_upvotes: { $sum: "$upvoteCount" }
            }
        }
       ]);
    

    const userRecord = await UserModel.findById(user_id);
    if (stats.length === 1) {
        // console.log(userRecord);
        // console.log(stats);
        const {total_ideas, total_upvotes} = stats[0];
        // console.log(total_ideas, total_upvotes);
        userRecord.ideas =  total_ideas;
        userRecord.upvotes = total_upvotes;
        await userRecord.save();
    }
    
    return res.json({
        userRecord
    })
        
});

const likePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.params);
    const { user_id,action } = req.body;
    // console.log(user_id);
    const post = await postsModel.findById(id);
    if (!post) {
        res.status(404);
        throw new Error("Cannot like post check the id");
    }
    if (action === 'normal') {}
    else {
        if (post.upvotes.includes(user_id)) {
            post.upvotes = post.upvotes.filter((likedUsers) => likedUsers != (user_id));
        }
        else {
            post.upvotes.push(user_id);
        }

    }
    await post.save();
    return res.status(200).json({
        upvotes: post.upvotes.length,
        status: post.upvotes.includes(user_id) ? true : false
    })
})

module.exports = {getAllPosts,getSinglePost,editPost,deletePost,createPost,setImageForUser, likePost,userBioData};