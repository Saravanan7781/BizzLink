const express = require('express');
const { register, login, current, googleLogin, fetchUser } = require('../controllers/usersController');
const verifyTokenHandler = require('../Middlewares/verifyAuthtokenHandler');
const router = express.Router();

router.post("/register", register);
router.post("/google/login", googleLogin);
router.post("/login", login);
router.post('/fetchCurrentUserData', fetchUser);

router.get("/current",verifyTokenHandler, current);


module.exports = router;