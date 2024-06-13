const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Address = require('../models/adressModel');
const Product = require('../models/productModel');
const Contact = require("../models/contactModel");
exports.createOrder = async (req, res) => {
    try {
        const { total,paid,address } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart is empty' });
        }

        const cartProducts = cart.products.map(cartProduct => ({
            product: cartProduct.product._id,
            quantity: cartProduct.quantity
        }));

        // Create a new order using the cart and provided total
        const newOrder = new Order({
            user: userId,
            address : address,
            cart: cart._id,
            products: cartProducts,
            total: total,
            paid: paid

        });

        for (const cartProduct of cart.products) {
            const product = cartProduct.product;
            const quantity = cartProduct.quantity;

            product.stock -= quantity;
            await product.save();
        }


        await newOrder.save();


        cart.products = [];
        cart.empty = true;
        await cart.save();
        const populatedOrder = await Order.findById(newOrder._id)
            .populate('products.product')
            .populate('address');

        res.status(201).json({ success: true, data: populatedOrder });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all orders for the user
        const orders = await Order.find({ user: userId })
            .populate('cart')
            .populate('products.product')
            .populate('address')
            .exec();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, error: 'No orders found for this user' });
        }

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAllOrders = async (req, res) => {
    try {
        // Find all orders and populate necessary fields
        const orders = await Order.find()
            .populate('user')
            .populate('cart')
            .populate('products.product')
            .populate('address')
            .exec();

        // Check if orders exist
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, error: 'No orders found' });
        }

        // Respond with orders data
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order by ID
        const order = await Order.findById(id);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Restore product stock before deleting the order
        for (const orderProduct of order.products) {
            const product = await Product.findById(orderProduct.product);
            if (product) {
                product.stock += orderProduct.quantity;
                await product.save();
            }
        }

        // Delete the order
        await Order.findByIdAndDelete(id);

        // Respond with success message
        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

};

exports.countOrders = async (req, res) => {
    try {
        const Count = await Order.countDocuments();
        res.json({ success: true, count: Count });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
