const express = require("express");

const router = express.Router();
const controller = require("../controllers/product_controller");
const authentication = require("../middleware/auth");
const permissionRole = require("../middleware/permission_role");
router.use(authentication);

router.get("/", permissionRole([0, 2]), controller.get_products);

router.post("/:id", permissionRole([0, 2]), controller.get_special_product);

router.post("/:id", permissionRole([0]), controller.add_product);

router.post("/:id", permissionRole([0]), controller.delete_product);

module.exports = router;
