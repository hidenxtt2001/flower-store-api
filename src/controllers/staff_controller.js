const Staff = require("../models/staff");
const Role = require("../models/role");
const ResponseHelper = require("../utils/response_helper");

module.exports = {
  get_staff: async (req, res) => {
    try {
      Staff.find()
        .then((doc) => {
          const response = new ResponseHelper(false, "Get All Staff", doc);
          res.status(200).json(response);
        })
        .catch((e) => {
          const response = new ResponseHelper(true, e.message, null);
          res.status(403).json(response);
        });
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
  get_special_staff: async (req, res) => {
    try {
      const staff = await Staff.findOne({ _id: req.params.id }).exec();
      if (!staff) throw new Error("The Staff does not exist");
      if (staff._id.toString() !== req.staff._id.toString())
        throw new Error("Don't have permission");
      const response = new ResponseHelper(
        false,
        "Get Special Staff",
        staff.toJSON()
      );
      res.status(200).json(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
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
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
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
      const refreshToken = await staff.getNewAccessToken();
      const response = new ResponseHelper(false, "Login Success", {
        accessToken: refreshToken,
      });
      res.status(201).send(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
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
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
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
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
};
