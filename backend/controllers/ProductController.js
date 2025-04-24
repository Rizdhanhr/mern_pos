// const { Product, Brand } = require("../models/Index.js");
const { formatDate } = require("../helpers/dateHelper.js");
const { Op } = require("sequelize");
const logger = require("../config/logger.js");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product.js");
const Brand = require("../models/Brand.js");
const Category = require("../models/Category.js");
const Unit = require("../models/Unit.js");
const uploadDir = path.join(__dirname, "../public/product");
const ProductResource = require("../resources/ProductResource.js");

class ProductController {
  static async index(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [
          {
            model: Brand,
            as: "brand",
            attributes: ["id", "name"]
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"]
          }
        ]
      });

      return res.status(200).json({ status: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static async getData(req, res, next) {
    try {
      const {
        page = 1,
        perPage = 10,
        search = "",
        sortColumn = 0,
        sortOrder = "asc"
      } = req.query;

      const column = [
        "name",
        "brand.name",
        "category.name",
        "stock",
        "price_buy",
        "price_sell",
        "updated_at",
        "status"
      ];
      const relationModels = { brand: Brand, category: Category, unit: Unit };

      const selectedColumn = column[parseInt(sortColumn)];

      let orderCondition;
      if (selectedColumn.includes(".")) {
        const [relation, field] = selectedColumn.split(".");
        const model = relationModels[relation];
        if (model) {
          orderCondition = [[{ model, as: relation }, field, sortOrder]];
        } else {
          throw new Error("Invalid relation for sorting.");
        }
      } else {
        orderCondition = [[selectedColumn, sortOrder]];
      }

      const whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { price_buy: { [Op.like]: `%${search}%` } },
          { price_sell: { [Op.like]: `%${search}%` } },
          { stock: { [Op.like]: `%${search}%` } },
          { "$brand.name$": { [Op.like]: `%${search}%` } },
          { "$category.name$": { [Op.like]: `%${search}%` } }
        ]
      };

      const totalProduct = await Product.count({
        where: whereCondition,
        include: [
          { model: Brand, as: "brand" },
          { model: Category, as: "category" },
          { model: Unit, as: "unit" }
        ]
      });

      const product = await Product.findAll({
        where: whereCondition,
        include: [
          { model: Brand, as: "brand", attributes: ["id", "name"] },
          { model: Category, as: "category", attributes: ["id", "name"] },
          { model: Unit, as: "unit", attributes: ["id", "name", "symbol"] }
        ],
        order: orderCondition,
        limit: parseInt(perPage),
        offset: (page - 1) * perPage
      });

      const response = {
        success: true,
        data: ProductResource.collection(product),
        total: totalProduct
      };

      return res.status(200).json(response);
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
      let statusString = req.body.status;
      let statusBoolean = statusString === "true";
      await Product.create(
        {
          name: req.body.name,
          price_sell: req.body.priceSell,
          price_buy: req.body.priceBuy,
          category_id: req.body.category,
          brand_id: req.body.brand,
          unit_id: req.body.unit,
          status: statusBoolean,
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
      const product = await Product.findOrFail(
        {
          where: { id: req.params.id },
          include: [
            { model: Brand, as: "brand", attributes: ["id", "name"] },
            { model: Category, as: "category", attributes: ["id", "name"] },
            { model: Unit, as: "unit", attributes: ["id", "name", "symbol"] }
          ]
        },
        res
      );
      const response = {
        success: true,
        data: new ProductResource(product).toJSON()
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const product = await Product.findOrFail(
        {
          where: { id: req.params.id }
        },
        res
      );

      let fileName = product.images;
      if (req.file) {
        fileName = `${Date.now()}-${"Product"}-${req.file.originalname.replace(
          /\s+/g,
          "_"
        )}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, req.file.buffer);
        const oldFilePath = path.join(uploadDir, product.images || "");
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      let statusString = req.body.status;
      let statusBoolean = statusString === "true";
      await product.update(
        {
          name: req.body.name,
          price_sell: req.body.priceSell,
          price_buy: req.body.priceBuy,
          category_id: req.body.category,
          brand_id: req.body.brand,
          unit_id: req.body.unit,
          status: statusBoolean ? 1 : 0,
          images: fileName
        },
        { user: req.user }
      );

      return res.status(200).json({ succes: true, message: "Data Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const product = await Product.findOrFail(
        {
          where: { id: req.params.id }
        },
        res
      );
      const filePath = path.join(uploadDir, product.images);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await product.destroy();
      return res.status(200).json({ success: true, message: "Data Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
