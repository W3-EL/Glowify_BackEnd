// controllers/categoryController.js
const Category = require('../models/CategoryModel');
const Product = require("../models/productModel");

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        res.json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        res.json({ success: true, data: deletedCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        res.json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.countCategories = async (req, res) => {
    try {
        const CategoryCount = await Category.countDocuments();
        res.json({ success: true, data: CategoryCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
