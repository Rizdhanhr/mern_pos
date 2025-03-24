const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const productValidation = require("../validator/productValidator");
const { validationHandler } = require("../middleware/validationHandler.js");
const { upload, validateImage } = require("../middleware/uploadHandler");

productRouter.get("/", productController.productIndex);
productRouter.get("/data", productController.productData);
productRouter.post(
  "/",
  validateImage,
  productValidation.productCreateValidator,
  validationHandler,
  productController.productStore
);
productRouter.get("/:id", productController.productShow);
productRouter.put(
  "/:id",
  // productValidation.productEditValidator,
  // validationHandler,
  productController.productUpdate
);
productRouter.delete("/:id", productController.productDelete);
module.exports = productRouter;
