const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public/product");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(
      new Error("Only image files are allowed! (jpeg, jpg, png, gif)"),
      false
    );
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single("image");

const validateImage = (req, res, next) => {
  upload(req, res, err => {
    req.validationErrors = req.validationErrors || [];

    if (err) {
      req.validationErrors.push({
        type: "field",
        msg: err.message,
        path: "image",
        location: "body"
      });
    }

    if (!req.file) {
      req.validationErrors.push({
        type: "field",
        msg: "The image field is required.",
        path: "image",
        location: "body"
      });
    } else {
      req.savedImage = req.file.filename; // Simpan nama file untuk digunakan di controller
    }

    next();
  });
};

module.exports = { upload, validateImage };
