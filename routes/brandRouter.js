const express = require('express');
const productrouter = express.Router();
const { getAllBrands } = require('../controllers/productController');




productrouter.get('/', getAllBrands);



module.exports = productrouter;
