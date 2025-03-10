const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const categoryValidation = require("../validator/categoryValidator");
const { validationHandler } = require("../middleware/validationHandler.js");

categoryRouter.get("/", categoryController.categoryIndex);
categoryRouter.post(
  "/",
  categoryValidation.categoryCreateValidator,
  validationHandler,
  categoryController.categoryStore
);
categoryRouter.get("/:id", categoryController.categoryShow);
categoryRouter.put(
  "/:id",
  categoryValidation.categoryEditValidator,
  validationHandler,
  categoryController.categoryUpdate
);
categoryRouter.delete("/:id", categoryController.categoryDelete);
module.exports = categoryRouter;
