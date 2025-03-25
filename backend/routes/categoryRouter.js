const express = require("express");
const router = express.Router();
const CategoryController = require(__dirname +
  "/../controllers/CategoryController");
const CategoryValidator = require("../validators/CategoryValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");

router.get("/", CategoryController.index);
router.get("/data", CategoryController.getData);
router.post(
  "/",
  CategoryValidator.create(),
  validationMessage,
  CategoryController.store
);
router.get("/:id", CategoryController.show);
router.put(
  "/:id",
  CategoryValidator.edit(),
  validationMessage,
  CategoryController.update
);
router.delete("/:id", CategoryController.delete);
module.exports = router;
