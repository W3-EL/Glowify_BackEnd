const express = require('express');
const cartControllers = express.Router();
const {createCart,getCartByUserId,addProductToCart,removeProductFromCart,clearCart,addPromoCode,validatePromoCode,getPromoCode,deletePromoCode,countPromoCode} = require('../controllers/cartControllers');
const requireUserAuth = require('../middlewares/requireUserAuth');
const requireAdminAuth = require("../middlewares/requireAdminAuth");
const {deleteContact, countContacts} = require("../controllers/contactController");

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


cartControllers.post('/promocode/add', requireAdminAuth, addPromoCode);

cartControllers.get('/promocode/', getPromoCode);

cartControllers.post('/promocode/validate', validatePromoCode);

cartControllers.get('/count/pc', countPromoCode);

cartControllers.delete('/promocode/delete/:id', requireAdminAuth, deletePromoCode);

module.exports = cartControllers;
