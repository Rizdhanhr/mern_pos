const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");
const AuthValidator = require("../validators/AuthValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");

router.post(
  "/login",
  AuthValidator.login(),
  validationMessage,
  AuthController.login
);
router.get("/refresh", AuthController.refreshToken);
module.exports = router;
