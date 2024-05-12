const express = require('express');
const productrouter = express.Router();
const { getAllCategories } = require('../controllers/productController');




productrouter.get('/', getAllCategories);



module.exports = productrouter;
