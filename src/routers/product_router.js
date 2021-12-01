const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/product_controller");
const authentication = require("../middleware/auth");
const permissionRole = require("../middleware/permission_role");
router.use(authentication);

router.get("/", permissionRole([0, 2]), controller.get_products);

router.post(
  "/",
  permissionRole([0]),
  upload.single("image"),
  controller.add_product
);

router.get("/:id", permissionRole([0, 2]), controller.get_special_product);
router.delete("/:id", permissionRole([0]), controller.delete_product);

router.patch(
  "/:id",
  upload.single("image"),
  permissionRole([0]),
  controller.update_product
);


module.exports = router;
