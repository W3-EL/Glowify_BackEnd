const express = require("express");
const { signUpUser, loginUser, getAllUsers} = require("../controllers/userControllers");

const userRoute = express.Router();

userRoute.post('/signup',signUpUser);
userRoute.post('/login',loginUser);
userRoute.get('/',getAllUsers);


module.exports = userRoute;