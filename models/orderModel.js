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
    total: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'On_Hold', 'Shipped', 'Delivered'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
