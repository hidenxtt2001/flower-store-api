const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
  product: {
    type: mongoose.model("Product").schema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
