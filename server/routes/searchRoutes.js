const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const searchAllRecommendedUsers = require('../controllers/searchControllers');

router.get('/searchAllRecommendedUsers',searchAllRecommendedUsers);

module.exports = router;