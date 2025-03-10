const express = require("express");
const brandRouter = express.Router();
const brandController = require("../controllers/brandController");
const brandValidation = require("../validator/brandValidator");
const { validationHandler } = require("../middleware/validationHandler.js");

brandRouter.get("/", brandController.brandIndex);
brandRouter.get("/data", brandController.brandData);
brandRouter.post(
  "/",
  brandValidation.brandCreateValidator,
  validationHandler,
  brandController.brandStore
);
brandRouter.get("/:id", brandController.brandShow);
brandRouter.put(
  "/:id",
  brandValidation.brandEditValidator,
  validationHandler,
  brandController.brandUpdate
);
brandRouter.delete("/:id", brandController.brandDelete);
module.exports = brandRouter;
