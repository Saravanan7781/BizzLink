const express = require('express');
const router = express.Router();
const { getAllPosts, getSinglePost, editPost, deletePost, createPost } = require('../controllers/postsControllers');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');
const upload = multer({ storage });

require('dotenv').config();



router.get('/getAllPosts', getAllPosts);
router.get('/getSinglePost/:id', getSinglePost)
router.post('/createPost', upload.array('images', 5), createPost);
router.put('/editPost/:id', editPost);
router.delete('/deletePost/:id', deletePost)



module.exports = router;