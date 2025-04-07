const express = require('express');
const mongoose = require('mongoose');
const {errHandler} = require('./Middlewares/errorHandler')
const app = express();
const dotenv = require('dotenv').config();
const postRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');
const cors  = require('cors');
const {dbConfig} = require('./config/dbConfig');
const verifyTokenHandler = require('./Middlewares/verifyAuthtokenHandler');
const RecommendAPI = require('./controllers/RecommendAPI');
try {
    dbConfig();
}
catch (err) {
    console.log("Network latency is not enough!");
    console.log(err.message);
}
app.listen(process.env.PORT, () => {
    console.log(` ${process.env.PORT} Server started running BHAI`);
});


app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Allows cross-origin popups
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none'); // Less strict embedding
  next();
});


app.use(cors());
app.use(express.json());
app.use("/api/user/", userRoutes);
app.use(verifyTokenHandler);
app.use("/api/posts/", postRoutes);
app.use(errHandler);
app.use("api/recommend/",RecommendAPI);
