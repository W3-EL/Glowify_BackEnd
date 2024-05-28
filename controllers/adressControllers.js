const Address = require('../models/adressModel');
const Cart = require("../models/cartModel");

exports.createAddress = async (req, res) => {
    try {
        const userId = req.body.user;
//        const address = new Address({ user: userId, products: [], empty: true });
        const newAddress = new Address({

            user: userId
        });
        await newAddress.save();
        res.status(201).json({ success: true, data: newAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.addAddress = async (req, res) => {
    try {

        const userId = req.user._id;
        const existingAddress = await Address.findOne({ user: userId });
        if (existingAddress) {
            return res.status(400).json({ success: false, error: 'User already has an address' });
        }
        const { state, city, address ,additionalInformation} = req.body;
        const newAddress = await Address.create({
            state,
            city,
            address,
            user: userId,
            additionalInformation: additionalInformation
        });

        res.status(201).json({ success: true, data: newAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.updateAddress = async (req, res) => {
    try {
        const { state, city, address, additionalInformation } = req.body;
        const userId = req.user._id;

        const updatedAddress = await Address.findOneAndUpdate(
            { user: userId },
            { state, city, address, additionalInformation },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to update it' });
        }

        res.json({ success: true, data: updatedAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.user._id;

        const deletedAddress = await Address.findOneAndDelete({ user: userId });

        if (!deletedAddress) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to delete it' });
        }

        res.json({ success: true, data: deletedAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getSpecificAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        const address = await Address.findOne({ user: userId });

        if (!address) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to access it' });
        }

        res.json({ success: true, data: address });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const {userId} = req.user._id;

        const addresses = await Address.find({ user: userId });

        res.json({ success: true, data: addresses });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }

};
