const express = require("express");
const { signUpUser, loginUser, getAllUsers,deleteUser, countUsers} = require("../controllers/userControllers");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

const userRoute = express.Router();

userRoute.post('/signup',signUpUser);
userRoute.post('/login',loginUser);
userRoute.get('/',getAllUsers);
userRoute.delete('/:id', requireAdminAuth,deleteUser);
userRoute.get('/count/u', countUsers);

module.exports = userRoute;