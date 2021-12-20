const mongoose = require("mongoose");
const Bill = require("../models/bill");
const ResponseHelper = require("../utils/response_helper");
const Package = require("../models/package");
module.exports = {
  get: async (req, res) => {
    try {
      const bills = await Bill.find().populate({
        path: "staff",
        select: ["name", "url"],
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
  create: async (req, res) => {
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
      let listPackage = [];
      for (index in details) {
        let detail = details[index];
        let package = await Package.findOne({
          "product._id": detail.product._id,
        });
        if (package) {
          package.quantity -= detail.quantity;
          listPackage.push(package);
        } else {
          return res
            .status(404)
            .json(new ResponseHelper(true, (message = "Data is invalid")));
        }
      }

      for (index in listPackage) {
        let package = listPackage[index];
        if (package.quantity >= 0) {
          await package.save();
        } else {
          return res
            .status(404)
            .json(
              new ResponseHelper(
                true,
                (message = "Package dont have enought quantity")
              )
            );
        }
      }

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
