const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/request_controller");
const permissionRole = require("../middleware/permission_role");
const { RoleEnum, RequestStatus } = require("../utils/enums");
router.use(auth);
router.get(
  "/",
  permissionRole([RoleEnum.Warehouse, RoleEnum.Supplier]),
  controller.get
);
router.post(
  "/",
  permissionRole([RoleEnum.Warehouse, RoleEnum.Supplier]),
  controller.create
);
router.patch(
  "/:id",
  permissionRole([RoleEnum.Warehouse]),
  controller.updateStatus
);
module.exports = router;
