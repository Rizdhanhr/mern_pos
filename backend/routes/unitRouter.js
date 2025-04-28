const express = require("express");
const router = express.Router();
const UnitController = require("../controllers/UnitController.js");
const UnitValidator = require("../validators/UnitValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("VIEW-UNIT"), UnitController.index);
router.post(
  "/",
  checkPermission("CREATE-UNIT"),
  UnitValidator.create(),
  validationMessage,
  UnitController.store
);
router.get("/:id", checkPermission("UPDATE-UNIT"), UnitController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-UNIT"),
  UnitValidator.edit(),
  validationMessage,
  UnitController.update
);
router.delete("/:id", checkPermission("DELETE-UNIT"), UnitController.delete);
module.exports = router;
