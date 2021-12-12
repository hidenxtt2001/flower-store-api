const mongoose = require("mongoose");
const Image = require("../models/image");

module.exports = {
  getImage: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `No Image with id: ${id}` });
    try {
      const image = await Image.findById(req.params.id);
      if (!image) throw new Error(`Image ${req.params.id} not found`);
      res.set("Content-Type", "image/png");
      res.send(image.data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: error.toString() });
    }
  },
};
