const Role = require("../models/role");
const ResponseHelper = require("../utils/response_helper");

module.exports = {
  get_role: async (req, res) => {
    try {
      const roles = await Role.find().exec();
      const response = new ResponseHelper(false, "Get All Role", roles);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
  add_role: async (req, res) => {
    try {
      const role = new Role(req.body);
      const result = await role.save();
      const response = new ResponseHelper(
        false,
        "Add new role success",
        result
      );
      res.status(201).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
  update_role: async (req, res) => {
    try {
      const response = new ResponseHelper();
      await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        { upsert: true },
        function (err, doc) {
          if (err) {
            res.status(500);
            response.error = true;
            response.message = "Update role failed";
          } else {
            response.message = "Update role success";
            response.data = data;
            res.status(201);
          }
        }
      );
      res.json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
};
