const mongoose = require("mongoose");
const validator = require("validator");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  basePrice: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
