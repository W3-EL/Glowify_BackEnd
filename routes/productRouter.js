const express = require('express');
const productrouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { updateProduct, createProduct, deleteProduct, getProductById, getProducts,getAllCategories,countProducts } = require('../controllers/productController');
const {countContacts} = require("../controllers/contactController");


productrouter.post('/', requireAdminAuth, createProduct);


productrouter.put('/:id', requireAdminAuth, updateProduct);


productrouter.delete('/:id', requireAdminAuth, deleteProduct);

productrouter.get('/:id', getProductById);

productrouter.get('/', getProducts);

productrouter.get('/category/', getAllCategories);

productrouter.get('/count/p', countProducts);

module.exports = productrouter;
