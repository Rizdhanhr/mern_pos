const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../validator/authValidator");
const { validationHandler } = require("../middleware/validationHandler.js");

authRouter.post(
  "/",
  authValidator.loginStoreValidator,
  validationHandler,
  authController.authLogin
);
module.exports = authRouter;
