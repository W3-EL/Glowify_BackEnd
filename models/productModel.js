const mongoose = require("mongoose");

const Schema = mongoose.Schema;




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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',

    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',

    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
