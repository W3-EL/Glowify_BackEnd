const express = require("express");
const { signUpUser, loginUser, getAllUsers,deleteUser} = require("../controllers/userControllers");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

const userRoute = express.Router();

userRoute.post('/signup',signUpUser);
userRoute.post('/login',loginUser);
userRoute.get('/',getAllUsers);
userRoute.delete('/:id', requireAdminAuth,deleteUser);

module.exports = userRoute;