// const { Product, Brand } = require("../models/Index.js");
const { formatDate } = require("../helpers/dateHelper.js");
const { Op } = require("sequelize");
const logger = require("../config/logger.js");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product.js");
const Brand = require("../models/Brand.js");
const uploadDir = path.join(__dirname, "../public/product");

class ProductController {
  static async index(req, res, next) {
    try {
      const product = await Product.findAll({
        include: {
          model: Brand,
          as: "brand", // Sesuai dengan alias di models/index.js
          attributes: ["id", "name"] // Pilih field yang ingin ditampilkan dari Brand
        }
      });

      return res.status(200).json({ status: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static async getData(req, res, next) {
    try {
      return res.status(200).json({ success: true, message: "Berhasil" });
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
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
          price_sell: req.body.priceSell,
          price_buy: req.body.priceBuy,
          category_id: req.body.category,
          brand_id: req.body.brand,
          status: Boolean(req.body.status) ? 1 : 0,
          images: fileName
        },
        { user: req.user }
      );

      return res.status(200).json({ success: true, message: "Data Created" });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
