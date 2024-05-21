const User = require("../models/userModel");
const Cart = require('../models/cartModel');
const jwt = require("jsonwebtoken")
const Product = require("../models/productModel");



const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        gender: user.gender,
        phone: user.phone,
        role: user.role
    };

    return jwt.sign(payload, process.env.SECRET, { expiresIn: "365d" });
};

const signUpUser = async (req, res) => {
    const { email, password, fullname, gender,phone } = req.body;
  
    try {
      const user = await User.signUp(email, password, fullname, gender,phone);
      const newCart = new Cart({ user: user._id });
      await newCart.save();
      const token = generateToken(user);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.logIn(email, password);
        const token = generateToken(user);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
};
const countUsers = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ success: true, count: userCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};













module.exports = { getAllUsers, getUserById, loginUser, signUpUser,deleteUser,countUsers };
