const express = require("express");
const router = express.Router();
const  imageController  = require("../controllers/image_controller");
const authMiddleWare = require("../middleware/auth");
router.get("/:id", authMiddleWare, imageController.getImage);

module.exports = router;