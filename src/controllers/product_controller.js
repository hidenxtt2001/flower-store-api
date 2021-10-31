const Product = require("../models/product");

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
    try {
      const product = new Product(req.body);
      const result = await product.save();
      const response = new ResponseHelper(false, "Get All Products", result);
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
};
