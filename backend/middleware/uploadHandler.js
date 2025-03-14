const multer = require("multer");
const path = require("path");

// Setup storage untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/product"); // Menyimpan file di folder "public/product"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file menggunakan timestamp
  }
});

// Validasi ekstensi dan ukuran file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only image files are allowed!"));
  }
};

// Setup multer dengan limit ukuran file (5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single("image"); // Menggunakan single untuk upload 1 file gambar

module.exports = upload;
