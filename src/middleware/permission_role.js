const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const Role = require("../models/role");
const ResponseHelper = require("../utils/response_helper");

/**
 *
 * @param {Number} role
 * @returns
 */
function permission_role(role) {
  return async (req, res, next) => {
    try {
      const staff = req.staff;
      if (
        role.find((x) => x === staff.role) &&
        (await Role.findOne({
          type: staff.role,
        }).exec())
      ) {
        next();
      } else {
        const response = new ResponseHelper(
          true,
          "You dont have permission",
          null
        );
        res.status(403).json(response);
      }
    } catch (e) {
      const response = new ResponseHelper(true, e, null);
      res.status(403).json(response);
    }
  };
}

module.exports = permission_role;
