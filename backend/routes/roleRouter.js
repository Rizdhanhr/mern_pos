const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const RoleValidator = require("../validators/RoleValidator");
const validationMessage = require("../middlewares/validationMiddleware.js");
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("VIEW-ROLE"), RoleController.index);
router.get(
  "/form-attributes",
  checkPermission(["UPDATE-ROLE", "CREATE-ROLE"]),
  RoleController.getFormAttributes
);
router.post(
  "/",
  checkPermission("UPDATE-ROLE"),
  RoleValidator.create(),
  validationMessage,
  RoleController.store
);
router.get("/:id", checkPermission("UPDATE-ROLE"), RoleController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-ROLE"),
  RoleValidator.edit(),
  validationMessage,
  RoleController.update
);
module.exports = router;
