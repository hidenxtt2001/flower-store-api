const express = require("express");

const roleController = require("../controllers/role_controller");
const permissionRole = require("../middleware/permission_role");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();
const  {RoleEnum} = require('../utils/enums')

router.get("/", roleController.get_role);

router.use(authMiddleWare);

router.put(
  "/:id",
  permissionRole([RoleEnum.Manager]),
  roleController.update_role
);

router.post("/", permissionRole([RoleEnum.Manager]), roleController.add_role);

module.exports = router;
