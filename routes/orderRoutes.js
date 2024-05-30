const express = require('express');
const { createOrder, getAllOrders, getOrdersByUser, deleteOrder, updateOrderStatus ,countOrders } = require('../controllers/orderController');
const requireAuth = require('../middlewares/requireUserAuth');
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const orderRouter = express.Router();


orderRouter.post('/', requireAuth,createOrder);

orderRouter.delete('/:id', requireAdminAuth, deleteOrder);

orderRouter.get('/', requireAdminAuth,getAllOrders);

orderRouter.get('/orders', requireAuth, getOrdersByUser);

orderRouter.put('/:id', requireAdminAuth,updateOrderStatus);
orderRouter.get('/count/o', countOrders);

module.exports = orderRouter;
