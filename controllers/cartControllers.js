const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const PromoCode = require('../models/promocodeModel');
const Contact = require("../models/contactModel");
const cron = require('node-cron');
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


exports.addPromoCode = async (req, res) => {
    try {
        const { codePromo, discountAmount, expirationDate } = req.body;
        const promoCode = new PromoCode({ codePromo, discountAmount, expirationDate });
        await promoCode.save();
        res.status(201).json({ success: true, data: promoCode });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getPromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.find();
        res.json({ success: true, data: promoCode });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



exports.deletePromoCode = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedcode = await PromoCode.findOneAndDelete({ _id: id });

        if (!deletedcode) {
            return res.status(404).json({ success: false, error: 'PromoCode not found' });
        }

        res.json({ success: true, data: deletedcode });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.validatePromoCode = async (req, res) => {
    try {
        const { codePromo } = req.body;
        const promoCode = await PromoCode.findOne({ codePromo });

        if (!promoCode) {
            return res.status(404).json({ success: false, message: 'Promo code not found' });
        }

        if (new Date(promoCode.expirationDate) < new Date()) {
            return res.status(400).json({ success: false, message: 'Promo code expired' });
        }

        res.status(200).json({ success: true, discountAmount: promoCode.discountAmount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updatePromoCode = async (req, res) => {
    try {
        const { id } = req.params;
        const { codePromo, discountAmount, expirationDate} = req.body;

        const updatedPromoCode = await PromoCode.findOneAndUpdate(
            { _id: id },
            { codePromo, discountAmount, expirationDate},
            { new: true }
        );

        if (!updatedPromoCode) {
            return res.status(404).json({ success: false, error: 'PromoCode not found' });
        }

        res.json({ success: true, data: updatedPromoCode });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.countPromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.countDocuments();
        res.json({ success: true, count: promoCode });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cron.schedule('0 * * * *', async () => {
    try {
        // Assuming you have a PromoCode model with an expirationDate field
        const expiredPromoCodes = await PromoCode.find({ expirationDate: { $lt: new Date() } });
        if (expiredPromoCodes.length > 0) {
            await PromoCode.deleteMany({ _id: { $in: expiredPromoCodes.map(code => code._id) } });
            console.log('Expired promo codes deleted:', expiredPromoCodes.length);
        }
    } catch (error) {
        console.error('Error deleting expired promo codes:', error);
    }
});




