const { body } = require("express-validator");

// Middleware validasi
const brandCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("The name field min 2 characters.")
];

const brandEditValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("The name field min 2 characters.")
];

module.exports = {
  brandCreateValidator,
  brandEditValidator
};
