const Category = require("../models/Category.js");
const Product = require("../models/Product.js");
const { Op } = require("sequelize");
const CategoryResource = require("../resources/CategoryResource.js");

class CategoryController {
  static async index(req, res, next) {
    try {
      const category = await Category.findAll();
      const response = {
        success: true,
        data: CategoryResource.collection(category)
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
      const totalCategory = await Category.count({
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

      const category = await Category.findAll({
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
        data: CategoryResource.collection(category),
        total: totalCategory
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      await Category.create({ name: req.body.name }, { user: req.user });
      return res.status(200).json({ success: true, message: "Data Created" });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      const response = {
        success: true,
        data: new CategoryResource(category).toJSON()
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      category.name = req.body.name;
      await category.save({ user: req.user });

      return res.status(200).json({ success: true, message: "Data Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findOrFail(
        {
          where: { id: id }
        },
        res
      );
      const countProduct = await Product.count({
        where: {
          category_id: id
        }
      });

      if (countProduct > 0) {
        return res.status(409).json({
          success: false,
          message: "Category cannot be deleted because it is used in product"
        });
      }

      await category.destroy();
      return res.status(200).json({ success: true, message: "Data Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
