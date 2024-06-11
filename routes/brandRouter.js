// routes/brandRoutes.js
const express = require('express');
const brandRouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');

const { createBrand, updateBrand, deleteBrand, getBrands,countBrands } = require('../controllers/brandController');
const {countCategories} = require("../controllers/categoryController");

brandRouter.post('/', requireAdminAuth,createBrand);
brandRouter.put('/:id',requireAdminAuth, updateBrand);
brandRouter.delete('/:id',requireAdminAuth, deleteBrand);
brandRouter.get('/', getBrands);
brandRouter.get('/count/b', countBrands);
module.exports = brandRouter;
