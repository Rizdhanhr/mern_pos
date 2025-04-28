const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const CategoryValidator = require("../validators/CategoryValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("VIEW-CATEGORY"), CategoryController.index);
router.post(
  "/",
  checkPermission("CREATE-CATEGORY"),
  CategoryValidator.create(),
  validationMessage,
  CategoryController.store
);
router.get("/:id", checkPermission("UPDATE-CATEGORY"), CategoryController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-CATEGORY"),
  CategoryValidator.edit(),
  validationMessage,
  CategoryController.update
);
router.delete(
  "/:id",
  checkPermission("DELETE-CATEGORY"),
  CategoryController.delete
);
module.exports = router;
