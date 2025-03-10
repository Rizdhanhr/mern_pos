const { body } = require("express-validator");

// Middleware validasi
const categoryCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .isLength({ min: 2, max: 255 })
];

const categoryEditValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .isLength({ min: 2, max: 255 })
];

module.exports = {
  categoryCreateValidator,
  categoryEditValidator
};
