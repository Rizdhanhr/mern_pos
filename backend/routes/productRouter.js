const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");
const ProductValidator = require("../validators/ProductValidator.js");
const validationMessage = require("../middlewares/validationMiddleware.js");
const {
  upload,
  validateImage,
  validateImageEdit
} = require("../middlewares/uploadMiddleware.js");

router.get("/", ProductController.index);
router.get("/data", ProductController.getData);
router.post(
  "/",
  validateImage,
  ProductValidator.create(),
  validationMessage,
  ProductController.store
);
router.get("/:id", ProductController.show);
router.put(
  "/:id",
  validateImageEdit,
  ProductValidator.edit(),
  validationMessage,
  ProductController.update
);
router.delete("/:id", ProductController.delete);
module.exports = router;
