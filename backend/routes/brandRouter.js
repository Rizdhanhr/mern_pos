const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/BrandController.js");
const BrandValidator = require("../validators/BrandValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("VIEW-BRAND"), BrandController.index);
router.post(
  "/",
  checkPermission("CREATE-BRAND"),
  BrandValidator.create(),
  validationMessage,
  BrandController.store
);
router.get("/:id", checkPermission("UPDATE-BRAND"), BrandController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-BRAND"),
  BrandValidator.edit(),
  validationMessage,
  BrandController.update
);
router.delete("/:id", checkPermission("DELETE-BRAND"), BrandController.delete);
module.exports = router;
