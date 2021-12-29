const multer = require("multer");
const mongoose = require("mongoose");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const upload = multer({
  fileFilter(req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error(`Invalid file type`);
    if (isValid) error = null;
    cb(error, true);
  },
});

module.exports = upload;
