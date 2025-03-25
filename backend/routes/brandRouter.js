const express = require("express");
const router = express.Router();
const BrandController = require(__dirname +
  "/../controllers/BrandController.js");
const BrandValidator = require(__dirname + "/../validators/BrandValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");

router.get("/", BrandController.index);
router.get("/data", BrandController.getData);
router.post(
  "/",
  BrandValidator.create(),
  validationMessage,
  BrandController.store
);
router.get("/:id", BrandController.show);
router.put(
  "/:id",
  BrandValidator.edit(),
  validationMessage,
  BrandController.update
);
router.delete("/:id", BrandController.delete);
module.exports = router;
