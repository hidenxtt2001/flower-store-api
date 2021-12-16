const mongoose = require("mongoose");
const Bill = require("../models/bill");
const ResponseHelper = require("../utils/response_helper");
module.exports = {
  getBills: async (req, res) => {
    try {
      const bills = await Bill.find().populate({
        path: "staff",
        select: ["name"],
      });
      res
        .status(200)
        .json(
          new ResponseHelper(false, (message = "Get Bills"), (data = bills))
        );
    } catch (error) {
      return res
        .status(404)
        .json(new ResponseHelper(true, (message = error.message)));
    }
  },
  createBill: async (req, res) => {
    const { details, customer, totalPrice } = req.body;
    const staff = req.staff;
    if (
      typeof details === "undefined" ||
      typeof customer === "undefined" ||
      typeof totalPrice === "undefined"
    )
      return res
        .status(404)
        .json(new ResponseHelper(true, (message = "Data is invalid")));
    try {
      const bill = new Bill({
        staff: staff._id,
        details: details,
        customer: customer,
        totalPrice: totalPrice,
      });
      const result = await bill.save();
      res
        .status(201)
        .json(
          new ResponseHelper(false, (message = "Create Bill Success"), result)
        );
    } catch (error) {
      res.status(404).json(new ResponseHelper(true, (message = error.message)));
    }
  },
};
