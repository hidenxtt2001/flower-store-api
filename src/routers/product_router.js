const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/product_controller");
const authentication = require("../middleware/auth");
const permissionRole = require("../middleware/permission_role");
const { RoleEnum } = require("../utils/enums");

router.use(authentication);

router.get(
  "/",
  permissionRole([RoleEnum.Warehouse, RoleEnum.Seller]),
  controller.get_products
);

router.post(
  "/",
  permissionRole([RoleEnum.Warehouse]),
  upload.single("image"),
  controller.add_product
);

router.get(
  "/:id",
  permissionRole([RoleEnum.Warehouse, RoleEnum.Seller]),
  controller.get_special_product
);
router.delete(
  "/:id",
  permissionRole([RoleEnum.Warehouse]),
  controller.delete_product
);

router.patch(
  "/:id",
  upload.single("image"),
  permissionRole([RoleEnum.Warehouse]),
  controller.update_product
);

module.exports = router;
