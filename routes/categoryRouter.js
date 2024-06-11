// routes/categoryRoutes.js
const express = require('express');
const categoryRouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { createCategory, updateCategory, deleteCategory, getCategoryById, getCategories,countCategories } = require('../controllers/categoryController');
const {countProducts} = require("../controllers/productController");

categoryRouter.post('/',requireAdminAuth, createCategory);
categoryRouter.put('/:id', requireAdminAuth,updateCategory);
categoryRouter.delete('/:id', requireAdminAuth,deleteCategory);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.get('/', getCategories);
categoryRouter.get('/count/c', countCategories);
module.exports = categoryRouter;
