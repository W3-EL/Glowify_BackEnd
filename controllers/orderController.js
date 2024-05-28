const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
exports.createOrder = async (req, res) => {
    try {
        const { total } = req.body;
        const userId = req.user._id;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart is empty' });
        }

        // Create a new order using the cart and provided total
        const newOrder = new Order({
            user: userId,
            cart: cart._id,
            total: total
        });

        // Save the new order
        await newOrder.save();

        // Optionally, you might want to clear the cart after the order is created
        cart.products = [];
        cart.empty = true;
        await cart.save();

        res.status(201).json({ success: true, data: newOrder });
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

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: 'You are not authorized to delete this order' });
        }

        await order.remove();

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
