const { body } = require("express-validator");

class ProductValidator {
  static create() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 }),
      body("priceSell")
        .trim()
        .notEmpty()
        .withMessage("The price sell field is required.") // Memastikan harga tidak kosong
        .isInt({ min: 10 })
        .withMessage("The price sell must be greater than 0.")
        .custom((value, { req }) => {
          if (parseInt(value) <= parseInt(req.body.priceBuy)) {
            throw new Error("The price sell must be greater than price buy.");
          }
          return true;
        }),
      body("priceBuy")
        .trim()
        .notEmpty()
        .withMessage("The price buy field is required.") // Memastikan harga tidak kosong
        .isInt({ min: 10 })
        .withMessage("The price buy must be greater than 0."),
      body("brand")
        .trim()
        .isInt()
        .withMessage("The brand field is required.")
        .notEmpty()
        .withMessage("The brand field is required."),
      body("category")
        .trim()
        .isInt()
        .withMessage("The category field is required.")
        .notEmpty()
        .withMessage("The category field is required.")
    ];
  }

  static edit() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 }),
      body("priceSell")
        .trim()
        .notEmpty()
        .withMessage("The price sell field is required.") // Memastikan harga tidak kosong
        .isInt({ min: 10 })
        .withMessage("The price sell must be greater than 0.")
        .custom((value, { req }) => {
          if (parseInt(value) <= parseInt(req.body.priceBuy)) {
            throw new Error("The price sell must be greater than price buy.");
          }
          return true;
        }),
      body("priceBuy")
        .trim()
        .notEmpty()
        .withMessage("The price buy field is required.") // Memastikan harga tidak kosong
        .isInt({ min: 10 })
        .withMessage("The price buy must be greater than 0."),
      body("brand")
        .trim()
        .isInt()
        .withMessage("The brand field is required.")
        .notEmpty()
        .withMessage("The brand field is required."),
      body("category")
        .trim()
        .isInt()
        .withMessage("The category field is required.")
        .notEmpty()
        .withMessage("The category field is required.")
    ];
  }
}

module.exports = ProductValidator;
