const express = require('express');
const router = express.Router();
const { getAllPosts, getSinglePost, editPost, deletePost, createPost,setImageForUser,likePost, userBioData } = require('../controllers/postsControllers');
const multer = require('multer');
const { storage, profileStorage } = require('../config/cloudinaryConfig');
const upload = multer({ storage });
const uploadPost = multer({storage: profileStorage });
require('dotenv').config();



router.get('/getAllPosts', getAllPosts);
router.get('/getSinglePost/:id', getSinglePost)
router.post('/createPost', upload.array('images', 5), createPost);
router.put('/editPost/:id', editPost);
router.delete('/deletePost/:id', deletePost)
router.post('/:id/likePost', likePost);
router.post('/fetchUserBioData', userBioData);

//to set the profile pic for user
router.post('/setImageForUser', uploadPost.single('image'), setImageForUser);


module.exports = router;