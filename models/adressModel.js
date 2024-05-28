const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    additionalInformation: {
        type: String,

    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);
