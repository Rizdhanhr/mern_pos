const { body } = require("express-validator");

class CategoryValidator {
  static create() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
    ];
  }
  static edit() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
    ];
  }
}

module.exports = CategoryValidator;
