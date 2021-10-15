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
      Staff.findById(req.params.id)
        .then((doc) => {
          const response = new ResponseHelper(false, "Get Special Staff", doc);
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
      const refreshToken = await staff.getNewRefreshToken();
      const response = new ResponseHelper(false, "Login Success", {
        ...staff.toJSON(),
        accessToken: accessToken,
        refreshToken: refreshToken,
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
      const staff = req.staff;
      staff.refreshToken.pull({ token: req.body.tokenRefresh });
      await staff.save();
      const response = new ResponseHelper(false, "Logout success", null);
      res.status(201).send(response);
    } catch (e) {
      const response = new ResponseHelper(true, e.message, null);
      res.status(403).json(response);
    }
  },
};
