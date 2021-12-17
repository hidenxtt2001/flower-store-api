const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/bill_controller");
const permissionRole = require("../middleware/permission_role");
const { RoleEnum } = require("../utils/enums");
router.use(auth);
router.get("/", permissionRole([RoleEnum.Warehouse]), controller.getBills);
router.post(
  "/",
  permissionRole([RoleEnum.Seller, RoleEnum.Warehouse]),
  controller.createBill
);
module.exports = router;