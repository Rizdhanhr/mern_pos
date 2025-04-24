const Brand = require("../models/Brand.js");
const Product = require("../models/Product.js");
const { Op } = require("sequelize");
const BrandResource = require("../resources/BrandResource.js");

class BrandController {
  static async index(req, res, next) {
    try {
      const brand = await Brand.findAll();
      const response = {
        success: true,
        data: BrandResource.collection(brand)
      };

      return res.status(200).json(response);
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

      const column = ["name", "updated_at"];
      const totalBrands = await Brand.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              updated_at: {
                [Op.like]: `%${search}%`
              }
            }
          ]
        }
      });

      const brands = await Brand.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              updated_at: {
                [Op.like]: `%${search}%`
              }
            }
          ]
        },
        order: [[column[parseInt(sortColumn)], sortOrder]],
        limit: parseInt(perPage),
        offset: (page - 1) * perPage
      });

      const response = {
        success: true,
        data: BrandResource.collection(brands),
        total: totalBrands
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      await Brand.create({ name: req.body.name }, { user: req.user });
      return res.status(200).json({ success: true, message: "Data Created" });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      const response = {
        success: true,
        data: new BrandResource(brand).toJSON()
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await Brand.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      brand.name = req.body.name;
      await brand.save({ user: req.user });
      return res.status(200).json({ succes: true, message: "Data Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await Brand.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      const countProduct = await Product.count({
        where: {
          brand_id: id
        }
      });

      if (countProduct > 0) {
        return res.status(409).json({
          success: false,
          message: "Brand cannot be deleted because it is used in product"
        });
      }

      await brand.destroy();

      return res.status(200).json({ success: true, message: "Data Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BrandController;
