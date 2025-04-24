const { Op } = require("sequelize");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const UserResource = require("../resources/UserResource");

class UserController {
  static async getData(req, res, next) {
    try {
      const {
        page = 1,
        perPage = 10,
        search = "",
        sortColumn = 0,
        sortOrder = "asc"
      } = req.query;

      const column = ["name", "email", "role.name", "updated_at"];

      const relationModels = { role: Role };

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
        [Op.and]: [
          { id: { [Op.ne]: req.user.id } },
          {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${search // user id ≠ current user
                  }%`
                }
              },
              { email: { [Op.like]: `%${search}%` } },
              { "$role.name$": { [Op.like]: `%${search}%` } }
            ]
          }
        ]
      };

      const totalUser = await User.count({
        where: whereCondition,
        include: [{ model: Role, as: "role" }]
      });

      const user = await User.findAll({
        where: whereCondition,
        include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
        order: orderCondition,
        limit: parseInt(perPage),
        offset: (page - 1) * perPage
      });

      const response = {
        success: true,
        data: UserResource.collection(user),
        total: totalUser
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role_id: req.body.role
      });

      return res.status(200).json({ success: true, message: "Data Created." });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const user = await User.findOrFail(
        {
          where: { id: req.params.id },
          include: [{ model: Role, as: "role", attributes: ["id", "name"] }]
        },
        res
      );

      const response = { success: true, data: new UserResource(user).toJSON() };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const user = await User.findOrFail(
        {
          where: { id: req.params.id }
        },
        res
      );

      user.name = req.body.name;
      user.email = req.body.email;
      user.role = req.body.role;

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }

      await user.save();

      return res.status(200).json({ success: true, message: "Data Updated." });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const user = await User.findOrFail(
        {
          where: { id: req.params.id }
        },
        res
      );

      await user.destroy();

      return res.status(200).json({ success: true, message: "Data Deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
