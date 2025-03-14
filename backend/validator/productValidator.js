const { body } = require("express-validator");

// Middleware validasi
const productCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .isLength({ min: 2, max: 255 }),
  body("price")
    .notEmpty()
    .withMessage("The price field is required.") // Memastikan harga tidak kosong
    .isInt({ min: 1 })
    .withMessage("The price must be a positive integer greater than 0."),
  body("category").notEmpty().withMessage("The category field is required."),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required.");
    }
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(req.file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(req.file.mimetype);
    if (!extname || !mimetype) {
      throw new Error("Only image files (jpg, jpeg, png, gif) are allowed.");
    }
    if (req.file.size > 5 * 1024 * 1024) {
      throw new Error("File size should be less than 5MB.");
    }
    return true;
  })
];

module.exports = {
  productCreateValidator
  //   categoryEditValidator
};
