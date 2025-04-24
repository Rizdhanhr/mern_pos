const { body } = require("express-validator");

class RoleValidator {
  static create() {
    return [
      body("name")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters."),
      body("description")
        .optional()
        .trim()
        .isString()
        .isLength({ max: 255 })
        .withMessage("The name field min 2 characters."),
      body("permission")
        .optional({ checkFalsy: true })
        .isArray()
        .withMessage("Permission must be an array.")
        .custom(arr => arr.every(Number.isInteger))
        .withMessage("All permissions must be integers.")
    ];
  }

  static edit() {
    return [
      body("name")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters."),
      body("description")
        .optional()
        .trim()
        .isString()
        .isLength({ max: 255 })
        .withMessage("The name field min 2 characters."),
      body("permission")
        .optional({ checkFalsy: true })
        .isArray()
        .withMessage("Permission must be an array.")
        .custom(arr => arr.every(Number.isInteger))
        .withMessage("All permissions must be integers.")
    ];
  }
}

module.exports = RoleValidator;
