const express = require("express");
const router = express.Router();
const UnitController = require("../controllers/UnitController.js");
const UnitValidator = require("../validators/UnitValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");

router.get("/", UnitController.index);
router.get("/data", UnitController.getData);
router.post(
  "/",
  UnitValidator.create(),
  validationMessage,
  UnitController.store
);
router.get("/:id", UnitController.show);
router.put(
  "/:id",
  UnitValidator.edit(),
  validationMessage,
  UnitController.update
);
router.delete("/:id", UnitController.delete);
module.exports = router;
