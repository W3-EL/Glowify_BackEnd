const express = require('express');
const cartControllers = express.Router();
const {createCart,getCartByUserId,addProductToCart,removeProductFromCart,clearCart} = require('../controllers/cartControllers');
const requireUserAuth = require('../middlewares/requireUserAuth');
const requireAdminAuth = require("../middlewares/requireAdminAuth");

// Create a new cart
cartControllers.post('/create', createCart);

// Get cart by user ID
cartControllers.get('/user/:userId', getCartByUserId);

// Add a product to the cart
cartControllers.post('/add', requireUserAuth, addProductToCart);

// Remove a product from the cart
cartControllers.post('/remove/',requireUserAuth, removeProductFromCart);

// Clear the cart
cartControllers.post('/clear/:userId',requireUserAuth, clearCart);

module.exports = cartControllers;
