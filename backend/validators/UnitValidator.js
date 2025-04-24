const { body } = require("express-validator");

class UnitValidator {
  static create() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters."),
      body("symbol")
        .trim()
        .notEmpty()
        .withMessage("The symbol field is required.")
        .isLength({ min: 1, max: 255 })
        .withMessage("The symbol field min 1 characters.")
    ];
  }

  static edit() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters."),
      body("symbol")
        .trim()
        .notEmpty()
        .withMessage("The symbol field is required.")
        .isLength({ min: 1, max: 255 })
        .withMessage("The symbol field min 1 characters.")
    ];
  }
}

module.exports = UnitValidator;
