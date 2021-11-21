const multer = require("multer");
const mongoose = require("mongoose");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error(`Invalid mime type`);
    if (isValid) error = null;
    callback(error, "./uploads/");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
