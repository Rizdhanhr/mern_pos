const Product = require("../models/Product");
const { formatDate } = require("../helper/dateHelper.js");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../public/product");

async function productIndex(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productData(req, res, next) {
  try {
    res.status(200).json({ success: true, message: "Berhasil" });
  } catch (error) {
    next(error);
  }
}

async function productStore(req, res, next) {
  try {
    const fileName = `${Date.now()}-${"Product"}-${req.file.originalname.replace(
      /\s+/g,
      "_"
    )}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, req.file.buffer);
    await Product.create(
      {
        name: req.body.name,
        price_sell: req.body.price,
        category_id: req.body.category,
        status: Boolean(req.body.status) ? 1 : 0,
        images: fileName
      },
      { user: req.user }
    );

    res.status(200).json({ success: true, message: "Data Created" });
  } catch (error) {
    next(error);
  }
}

async function productShow(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productUpdate(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productDelete(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

module.exports = {
  productIndex,
  productStore,
  productUpdate,
  productShow,
  productDelete,
  productData
};
