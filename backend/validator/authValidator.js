const { body } = require("express-validator");

const loginStoreValidator = [
  body("email")
    .notEmpty()
    .withMessage("The email field is required.")
    .trim()
    .isEmail()
    .withMessage("The email format is incorrect."),
  body("password")
    .notEmpty()
    .withMessage("The password field is required.")
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage("The password field min 6 characters.")
];

module.exports = {
  loginStoreValidator
};
