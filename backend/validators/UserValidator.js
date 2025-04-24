const { body } = require("express-validator");
const User = require("../models/User");

class UserValidator {
  static create() {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("The name field is required.")
        .isLength({ min: 2, max: 255 })
        .withMessage("The name field min 2 characters."),
      body("email")
        .trim()
        .notEmpty()
        .withMessage("The email field is required.")
        .isEmail()
        .withMessage("The email field must be a valid email address.")
        .custom(async value => {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error("The email has already been taken.");
          }
          return true;
        }),
      body("role").trim().notEmpty().withMessage("The role field is required."),
      body("password")
        .trim()
        .notEmpty()
        .withMessage("The password field is required.")
        .isLength({ min: 6, max: 12 })
        .withMessage("The password field must 6-12 characters."),
      body("passwordConfirmation")
        .trim()
        .notEmpty()
        .withMessage("The password confirmation field is required.")
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("The password confirmation does not match.");
          }
          return true;
        })
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
      body("email")
        .trim()
        .notEmpty()
        .withMessage("The email field is required.")
        .isEmail()
        .withMessage("The email field must be a valid email address.")
        .custom(async (value, { req }) => {
          const user = await User.findOne({ where: { email: value } });
          if (user && user.id !== parseInt(req.params.id)) {
            throw new Error("The email has already been taken.");
          }
          return true;
        }),
      body("role").trim().notEmpty().withMessage("The role field is required."),
      body("password")
        .trim()
        .optional({ checkFalsy: true })
        .isLength({ min: 6, max: 12 })
        .withMessage("The password field must 6 characters."),
      body("passwordConfirmation").trim().custom((value, { req }) => {
        const password = req.body.password;
        const passwordConfirmation = value;
        const isPasswordFilled = password && password.trim() !== "";
        const isConfirmationFilled =
          passwordConfirmation && passwordConfirmation.trim() !== "";

        if (isPasswordFilled || isConfirmationFilled) {
          if (!isPasswordFilled) {
            throw new Error(
              "The password field is required when confirmation is present."
            );
          }
          if (!isConfirmationFilled) {
            throw new Error("The password confirmation field is required.");
          }
          if (password !== passwordConfirmation) {
            throw new Error("The password confirmation does not match.");
          }
        }
        return true;
      })
    ];
  }
}

module.exports = UserValidator;
