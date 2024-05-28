const express = require('express');
const addressRouter = express.Router();
const { addAddress, updateAddress, deleteAddress, getSpecificAddress,getAddresses } = require('../controllers/adressControllers');
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const requireUserAuth = require('../middlewares/requireUserAuth');


addressRouter.post('/',requireUserAuth, addAddress);

addressRouter.put('/',requireUserAuth, updateAddress);

addressRouter.delete('/',requireUserAuth, deleteAddress);

addressRouter.get('/:userId',getSpecificAddress);


module.exports = addressRouter;
