const mongoose = require("mongoose");
const { RequestStatus } = require("../utils/enums");
const requestDetailSchema = mongoose.Schema({
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

const requestSchema = mongoose.Schema({
  staff: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  details: [
    {
      type: requestDetailSchema,
      required: true,
    },
  ],
  approve: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: RequestStatus.Pending,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
