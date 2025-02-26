const express = require('express');
const router = express.Router();
const { getAllPosts, getSinglePost, editPost, deletePost, createPost } = require('../controllers/postsControllers');


router.get('/getAllPosts', getAllPosts);
router.get('/getSinglePost/:id', getSinglePost)
router.post('/createPost', createPost)
router.put('/editPost/:id', editPost);
router.delete('/deletePost/:id', deletePost)



module.exports = router;