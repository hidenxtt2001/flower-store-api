const Staff = require("../models/staff");
const Role = require("../models/role");
const ResponseHelper = require("../utils/response_helper");
const { mongoose } = require("mongoose");

module.exports = {
  get_staff: async (req, res) => {
    try {
      const staff = await Staff.find();
      const response = new ResponseHelper(false, "Get All Staff", staff);
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  get_special_staff: async (req, res) => {
    try {
      const staff = await Staff.findOne({ _id: req.params.id }).exec();
      if (!staff)
        res.status(404).json(new ResponseHelper(true, "Don't exist user"));
      if (staff._id.toString() !== req.staff._id.toString())
        res.status(403).json(new ResponseHelper(true, "Don't have permission"));
      const response = new ResponseHelper(
        false,
        "Get Special Staff",
        staff.toJSON()
      );
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  update_staff: async (req, res) => {
    const { id } = req.params;
    const match = req.body;

    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      const response = new ResponseHelper(true, "Id not valid");
      res.status(404).json(response);
    }
    try {
      console.log(await Role.findOne({ type: role }));
      await Staff.findByIdAndUpdate(id, match).exec();
      const response = new ResponseHelper(false, "Update staff success");
      res.status(201).json(response);
    } catch (error) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  profile: async (req, res) => {
    try {
      const staff = req.staff;
      const response = new ResponseHelper(
        false,
        "Get Info Profile",
        staff.toJSON()
      );
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  login: async (req, res) => {
    try {
      const staff = await Staff.findByCredentials(
        req.body.email,
        req.body.password
      );
      if (!staff) {
        const response = new ResponseHelper(
          true,
          "Email or Password incorrect"
        );
        res.status(401).json(response);
        return;
      }
      const accessToken = await staff.getNewAccessToken();
      const response = new ResponseHelper(false, "Login Success", {
        accessToken: accessToken,
      });
      res.status(201).send(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(403).json(response);
    }
  },
  register: async (req, res) => {
    try {
      const staff = new Staff(req.body);
      const result = await staff.save();
      const response = new ResponseHelper(
        false,
        "Register Success",
        result.toJSON()
      );
      res.status(201).send(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
  logout: async (req, res) => {
    try {
      const result = await Staff.findOneAndUpdate(
        {
          accessToken: {
            $elemMatch: {
              token: req.body.accessToken,
            },
          },
        },
        {
          $pull: { accessToken: { token: req.body.accessToken } },
        },
        { safe: true, multi: true }
      );
      await result.save();
      const response = new ResponseHelper(false, "Logout success");
      res.status(201).send(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message);
      res.status(400).json(response);
    }
  },
};
