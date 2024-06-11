
const Brand = require('../models/brandModel');


exports.createBrand = async (req, res) => {
    try {
        const { name, logo } = req.body;

        const newBrand = new Brand({ name, logo });
        await newBrand.save();

        res.status(201).json({ success: true, data: newBrand });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo } = req.body;

        const updatedBrand = await Brand.findByIdAndUpdate(id, { name, logo }, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ success: false, error: 'Brand not found' });
        }

        res.json({ success: true, data: updatedBrand });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({ success: false, error: 'Brand not found' });
        }

        res.json({ success: true, data: deletedBrand });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.countBrands = async (req, res) => {
    try {
        const BrandCount = await Brand.countDocuments();
        res.json({ success: true, data: BrandCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};