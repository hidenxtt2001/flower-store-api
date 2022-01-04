const express = require("express");
const router = express.Router();
const controller = require("../controllers/package_controller");
const auth = require("../middleware/auth");
const permissionRole = require("../middleware/permission_role");
const { RoleEnum } = require("../utils/enums");
router.use(auth);
router.get(
  "/",
  permissionRole([RoleEnum.Seller, RoleEnum.Warehouse, RoleEnum.Manager]),
  controller.get
);

module.exports = router;
