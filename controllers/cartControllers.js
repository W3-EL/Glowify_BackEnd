const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Create a new cart
exports.createCart = async (req, res) => {
    try {
        const userId = req.body.user;
        const cart = new Cart({ user: userId, products: [], empty: true });
        await cart.save();
        res.status(201).json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: userId }).populate('products');
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }
        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Add a product to the cart
exports.addProductToCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is authenticated and the user ID is available
        const { productId, quantity } = req.body; // Get quantity from request body

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        let existingProduct = cart.products.find(item => item.product.equals(productId));
        if (existingProduct) {
            existingProduct.quantity += quantity; // Increment the quantity if the product already exists
        } else {
            cart.products.push({ product: productId, quantity: quantity }); // Add product with the specified quantity
        }

        cart.empty = false;
        await cart.save();

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is authenticated and the user ID is available
        const { productId } = req.body; // Extract productId from the request body

        // Find the cart by user ID
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));
        if (productIndex === -1) {
            return res.status(404).json({ success: false, error: 'Product not found in cart' });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Update the cart's empty status
        cart.empty = cart.products.length === 0;

        // Save the updated cart
        await cart.save();

        // Respond with the updated cart
        res.json({ success: true, data: cart });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({ success: false, error: error.message });
    }
};// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }
        cart.products = [];
        cart.empty = true;
        await cart.save();
        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
