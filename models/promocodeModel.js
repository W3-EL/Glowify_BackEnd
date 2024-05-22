const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const promoCodeSchema = new Schema({
    codePromo: {
        type: String,
        required: true,
        unique: true
    },
    discountAmount: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
});

module.exports = mongoose.model('PromoCode', promoCodeSchema);
