const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String 
    }
});
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    desc_prod: {
        type: String,
        required: true
    },
    solde: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    category: categorySchema,
    brand: brandSchema 
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
