const express = require('express');
const productrouter = express.Router();
const { getAllCategories,countCategories } = require('../controllers/productController');




productrouter.get('/', getAllCategories);
productrouter.get('/countCategories/c', countCategories);


module.exports = productrouter;
