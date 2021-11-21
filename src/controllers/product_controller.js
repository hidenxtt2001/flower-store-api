const { mongoose } = require("mongoose");
const Product = require("../models/product");
const ResponseHelper = require("../utils/response_helper");

module.exports = {
  get_products: async (req, res) => {
    try {
      const products = await Product.find().exec();
      const response = new ResponseHelper(false, "Get All Products", products);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(500).json(response);
    }
  },
  get_special_product: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id }).exec();
      const response = new ResponseHelper(false, "Get All Products", product);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(500).json(response);
    }
  },
  add_product: async (req, res) => {
    const { name, description, basePrice } = req.body;
    const image = req.file.path;
    try {
      const product = new Product({
        name: name,
        description: description,
        basePrice: basePrice,
        image: image,
      });
      const result = await product.save();
      const response = new ResponseHelper(false, "Add Product Success", result);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(500).json(response);
    }
  },
  delete_product: async (req, res) => {
    try {
      const product = Product.findOneAndRemove({ _id: req.body.id }).exec();
      const result = await product.save();
      const response = new ResponseHelper(false, "Get All Products", result);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(500).json(response);
    }
  },

  update_product: async (req, res) => {
    try {
      const product = Product.findOneAndRemove({ _id: req.body.id }).exec();
      const result = await product.save();
      const response = new ResponseHelper(false, "Get All Products", result);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(404).json(response);
    }
  },
};
