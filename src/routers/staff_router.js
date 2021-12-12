const express = require("express");

const router = express.Router();
const controller = require("../controllers/staff_controller");
const permissionRole = require("../middleware/permission_role");
const authMiddleWare = require("../middleware/auth");
const { RoleEnum } = require("../utils/enums");
const upload = require("../middleware/upload");

// Login to staff account
router.post("/login", controller.login);

router.post("/logout", controller.logout);

router.use(authMiddleWare);

// Load current profile
router.get("/profile", controller.profile);

// Register new staff account
router.post(
  "/register",
  permissionRole([RoleEnum.Manager]),
  upload.single("image"),
  controller.register
);

// Get all staff
router.get("/", permissionRole([RoleEnum.Manager]), controller.get_staffs);

//Get special staff by id
router.get(
  "/:id",
  permissionRole([RoleEnum.Manager]),
  controller.get_special_staff
);

// Update staff info
router.patch(
  "/:id",
  permissionRole([RoleEnum.Manager]),
  controller.update_staff
);

module.exports = router;
