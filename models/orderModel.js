const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    total: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        enum: ['Pending', 'On_Hold', 'Shipped', 'Delivered','Canceled'],
        default: 'Pending'
    },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
