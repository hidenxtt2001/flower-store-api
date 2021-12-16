const mongoose = require("mongoose");
const Image = require("../models/image");

module.exports = {
  getImage: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response = new ResponseHelper(true, `No Image with id: ${id}`);
      return res.status(404).json(response);
    }

    try {
      const image = await Image.findById(req.params.id);
      if (!image) throw new Error(`Image ${req.params.id} not found`);
      res.set("Content-Type", "image/png");
      res.send(image.data);
    } catch (error) {
      const response = new ResponseHelper(true, error.message);
      res.status(404).send({ error: error.toString() });
    }
  },
};
