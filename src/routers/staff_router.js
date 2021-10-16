const express = require("express");

const router = express.Router();
const controller = require("../controllers/staff_controller");
const permissionRole = require("../middleware/permission_role");
const authMiddleWare = require("../middleware/auth");

// Login to staff account
router.post("/login", controller.login);

router.post("/logout", controller.logout);

// Get new access token
router.post("/token", controller.get_new_access_token);

// Register new staff account
router.post("/register", controller.register);

router.use(authMiddleWare);

// Get all staff
router.get("/", permissionRole, controller.get_staff);

//Get special staff by id
router.get("/:id", permissionRole, controller.get_special_staff);

// Load current profile
router.get("/profile", controller.profile);

module.exports = router;
