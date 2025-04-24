const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validationMessage = require("../middlewares/validationMiddleware.js");
const UserValidator = require("../validators/UserValidator.js");

router.get("/", UserController.getData);
router.post(
  "/",
  UserValidator.create(),
  validationMessage,
  UserController.store
);
router.get("/:id", UserController.show);
router.put(
  "/:id",
  UserValidator.edit(),
  validationMessage,
  UserController.update
);
router.delete("/:id", UserController.delete);
module.exports = router;
