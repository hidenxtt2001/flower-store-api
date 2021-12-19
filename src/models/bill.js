const mongoose = require("mongoose");
const Product = require("./product");

const billDetailSchema = mongoose.Schema({
  product: {
    type: mongoose.model("Product").schema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
});

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const billSchema = mongoose.Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    details: [
      {
        type: billDetailSchema,
        required: true,
      },
    ],
    customer: {
      type: customerSchema,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
