const mongoose = require("mongoose");
const Request = require("../models/request");
const ResponseHelper = require("../utils/response_helper");
const { RequestStatus } = require("../utils/enums");
module.exports = {
  get: async (req, res) => {
    try {
      const requests = await Request.find().populate({
        path: "staff",
        select: ["name", "url"],
      });
      const response = new ResponseHelper(false, "Get Requests", requests);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },
  create: async (req, res) => {
    const { details, totalPrice } = req.body;
    const staff = req.staff;
    if (typeof details === "undefined" || typeof totalPrice === "undefined")
      return res
        .status(404)
        .json(new ResponseHelper(true, (message = "Data is invalid")));
    try {
      const request = new Request({
        staff: staff._id,
        details: details,
        totalPrice: totalPrice,
      });
      const result = await request.save();
      res
        .status(201)
        .json(new ResponseHelper(false, (message = "Request Success"), result));
    } catch (error) {
      res.status(404).json(new ResponseHelper(true, (message = error.message)));
    }
  },
  updateStatus: async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    if (!Object.values(RequestStatus).includes(status)) {
      return res
        .status(404)
        .json(new ResponseHelper(true, (message = "Status not defind")));
    }
    try {
      await Request.findByIdAndUpdate(id, { status: status });
      res
        .status(201)
        .json(
          new ResponseHelper(false, (message = "Request Update Status Success"))
        );
    } catch (error) {
      res.status(404).json(new ResponseHelper(true, (message = error.message)));
    }
  },
  approve: async (req, res) => {
    const { id } = req.params;
    try {
      await Request.findByIdAndUpdate(id, { approve: true });
      res
        .status(201)
        .json(new ResponseHelper(false, (message = "Request Approve Success")));
    } catch (error) {
      res.status(404).json(new ResponseHelper(true, (message = error.message)));
    }
  },
};
