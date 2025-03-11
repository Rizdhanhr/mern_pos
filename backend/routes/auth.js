const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../validator/authValidator");
const { validationHandler } = require("../middleware/validationHandler.js");

authRouter.post(
  "/login",
  authValidator.loginStoreValidator,
  validationHandler,
  authController.authLogin
);
authRouter.get("/refresh", authController.refreshToken);
module.exports = authRouter;
