const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const register = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { user_image, username, role, email, password, domains, linkedin,startup,website } = req.body;
    console.log(linkedin);
    if (!username || !role || !email || !password  || !linkedin) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await userModel.create(
        {
            username,
            role,
            email,
            password: hashedPassword,
            domains,
            startup,
            linkedin,
            website
        }
    )
    res.json(response);
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("No such email id encountered");
    }
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            user:{
            id: user._id,
            email: user.email,
            role: user.role
            }
        },
        process.env.ACCESS_SECRET_TOKEN
        , {
                expiresIn: "1d"
        }  
        ) 
        // console.log(token);
        res.json({
            token
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const googleLogin = asyncHandler(async (req, res) => {
    const { userData } = req.body;
    const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);
    // console.log(userData);
    // Verify Google token
    const ticket = await client.verifyIdToken({
        idToken: userData,
        audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    // Check if user exists
    let user = await userModel.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("No email registered via this email");
    }

    const token = jwt.sign(
        {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        },
        process.env.ACCESS_SECRET_TOKEN,
        { expiresIn: "1d" }
    );

    res.json({
        id: user._id,
        email: user.email,
        role: user.role,
        token, // Send token back to client
    });
});


const current = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { register,login,current,googleLogin };