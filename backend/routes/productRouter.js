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
const checkPermission = require("../middlewares/authorizationMiddleware.js");

router.get("/", checkPermission("CREATE-PRODUCT"), ProductController.index);
router.get(
  "/form-attributes",
  checkPermission(["CREATE-PRODUCT", "UPDATE-PRODUCT"]),
  ProductController.getFormAttributes
);
router.post(
  "/",
  checkPermission("CREATE-PRODUCT"),
  validateImage,
  ProductValidator.create(),
  validationMessage,
  ProductController.store
);
router.get("/:id", checkPermission("VIEW-PRODUCT"), ProductController.show);
router.put(
  "/:id",
  checkPermission("UPDATE-PRODUCT"),
  validateImageEdit,
  ProductValidator.edit(),
  validationMessage,
  ProductController.update
);
router.delete(
  "/:id",
  checkPermission("DELETE-PRODUCT"),
  ProductController.delete
);
module.exports = router;
