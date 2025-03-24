const { body } = require("express-validator");

const productCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name field is required.")
    .isLength({ min: 2, max: 255 }),
  body("price")
    .notEmpty()
    .withMessage("The price field is required.") // Memastikan harga tidak kosong
    .isInt({ min: 10 })
    .withMessage("The price must be a positive integer greater than 0."),
  body("category")
    .isInt()
    .withMessage("The category field is required.")
    .notEmpty()
    .withMessage("The category field is required.")
];

module.exports = {
  productCreateValidator
};
