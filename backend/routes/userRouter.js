const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validationMessage = require("../middlewares/validationMiddleware.js");
const UserValidator = require("../validators/UserValidator.js");
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("VIEW-USER"), UserController.index);
router.get(
  "/form-attributes",
  checkPermission(["UPDATE-USER", "CREATE-USER"]),
  UserController.getFormAttributes
);
router.post(
  "/",
  checkPermission("CREATE-USER"),
  UserValidator.create(),
  validationMessage,
  UserController.store
);
router.get("/:id", checkPermission("UPDATE-USER"), UserController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-USER"),
  UserValidator.edit(),
  validationMessage,
  UserController.update
);
router.delete("/:id", checkPermission("DELETE-USER"), UserController.delete);
module.exports = router;
