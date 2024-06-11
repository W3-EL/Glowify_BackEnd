const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const { product_name, desc_prod, price, stock,img,gender, category, brand } = req.body;

        const newProduct = new Product({
            product_name,
            desc_prod,
            price,
            stock,
            img,
            gender,
            category,
            brand
        });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, desc_prod,solde, price, stock ,img,gender, category, brand} = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            { product_name, desc_prod,solde, price, stock ,img,gender, category, brand},
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .populate('brand', 'name logo');

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllBrands = async (req, res) => {
    try {
        const brand = await Product.distinct('brand');
        res.json({ success: true, data: brand });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: deletedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.countProducts = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.json({ success: true, data: productCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
