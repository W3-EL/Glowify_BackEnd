const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullname_contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
  }, { timestamps: true });



module.exports = mongoose.model("Contact", contactSchema);
