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
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },
  get_special_product: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id }).exec();
      const response = new ResponseHelper(false, "Get All Products", product);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },
  add_product: async (req, res) => {
    const { name, description, basePrice } = req.body;
    const image = !!req.file ? req.file.path : "";
    try {
      const product = new Product({
        name: name,
        description: description,
        basePrice: basePrice,
        image: image,
      });
      const result = await product.save();
      const response = new ResponseHelper(false, "Add Product Success", result);
      res.status(201).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  delete_product: async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndRemove(id);
      const response = new ResponseHelper(false, "Delete Product Success");
      res.status(201).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },

  update_product: async (req, res) => {
    const { id } = req.params;
    const match = req.body;
    if (!!req.file) match.image = req.file.path;
    try {
      const product = await Product.findByIdAndUpdate(id, match, {
        upsert: true,
      });
      await product.save();
      const response = new ResponseHelper(false, "Update Product Success");
      res.status(201).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },
};
