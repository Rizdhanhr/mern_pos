const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const RoleValidator = require("../validators/RoleValidator");
const validationMessage = require("../middlewares/validationMiddleware.js");

router.get("/", RoleController.index);
router.get("/permission", RoleController.getRolePermission);
router.post(
  "/",
  RoleValidator.create(),
  validationMessage,
  RoleController.store
);
router.get("/data", RoleController.getData);
router.get("/:id", RoleController.show);
router.put(
  "/:id",
  RoleValidator.edit(),
  validationMessage,
  RoleController.update
);
module.exports = router;
