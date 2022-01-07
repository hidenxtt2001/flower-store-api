const Package = require("../models/package");
const ResponseHelper = require("../utils/response_helper");
module.exports = {
  get: async (req, res) => {
    try {
      const packages = await Package.find({ quantity: { $gt: 0 } });
      const response = new ResponseHelper(false, "Get Packages", packages);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(404).json(response);
    }
  },
};
