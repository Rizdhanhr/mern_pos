const Product = require("../models/Product.js");
const Unit = require("../models/Unit.js");
const UnitResource = require("../resources/UnitResource.js");
const { Op } = require("sequelize");

class UnitController {
  static async index(req, res, next) {
    try {
      const {
        page = 1,
        perPage = 10,
        search = "",
        sortColumn = 0,
        sortOrder = "asc"
      } = req.query;

      const column = ["name", "symbol", "updated_at"];
      const totalUnits = await Unit.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              symbol: {
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

      const units = await Unit.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              symbol: {
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
        data: UnitResource.collection(units),
        total: totalUnits
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      await Unit.create(
        {
          name: req.body.name,
          symbol: req.body.symbol
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
      const { id } = req.params;
      const unit = await Unit.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      const response = {
        success: true,
        data: new UnitResource(unit).toJSON()
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const unit = await Unit.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      unit.name = req.body.name;
      unit.symbol = req.body.symbol;
      await unit.save({ user: req.user });
      return res.status(200).json({ succes: true, message: "Data Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const unit = await Unit.findOrFail(
        {
          where: { id: id }
        },
        res
      );

      const countProduct = await Product.count({
        where: {
          unit_id: id
        }
      });

      if (countProduct > 0) {
        return res.status(409).json({
          success: false,
          message: "Unit cannot be deleted because it is used in product"
        });
      }

      await unit.destroy();

      return res.status(200).json({ success: true, message: "Data Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UnitController;
