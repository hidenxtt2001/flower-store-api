const express = require("express");

const roleController = require("../controllers/role_controller");
const permissionRole = require("../middleware/permission_role");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleWare);

router.put("/:id", permissionRole, roleController.update_role);

router.post("/", roleController.add_role);

router.get("/", roleController.get_role);

module.exports = router;
