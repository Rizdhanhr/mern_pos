const { body } = require("express-validator");

class BrandValidator {
  static create() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The name field is required.")
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters.")
    ];
  }

  static edit() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The name field is required.")
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters.")
    ];
  }
}

module.exports = BrandValidator;
