const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyTokenHandler = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
        res.status(401);
        throw new Error("Token is not available");
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("Token expired");
            next();
        }
        else {
            console.log("Token verified ✅");
            req.user = decoded.user;
            next();
        }
    })

    // res.json(req.user);
    // console.log(token);
});

module.exports = verifyTokenHandler;