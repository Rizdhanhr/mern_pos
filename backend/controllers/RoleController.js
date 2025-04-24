const { Op } = require("sequelize");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Menu = require("../models/Menu");
const Module = require("../models/Module");
const RoleResource = require("../resources/RoleResource");
const sequelize = require("../config/db");

class RoleController {
  static async index(req, res, next) {
    const role = await Role.findAll();

    const response = {
      success: true,
      data: RoleResource.collection(role)
    };
    res.status(200).json(response);

    try {
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

      const column = ["name", "description", "updated_at"];
      const totalRole = await Role.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              description: {
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

      const role = await Role.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              description: {
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
        data: RoleResource.collection(role),
        total: totalRole
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getRolePermission(req, res, next) {
    try {
      const menu = await Menu.findAll({
        order: [["name", "asc"]],
        attributes: ["id", "name"]
      });
      const module = await Module.findAll({
        order: [["ordering", "asc"]],
        attributes: ["id", "name"]
      });

      const permission = await Permission.findAll();
      const permissionMap = {};

      permission.forEach(p => {
        const menuId = p.menu_id;
        const moduleId = p.module_id;

        if (!permissionMap[menuId]) {
          permissionMap[menuId] = {};
        }

        permissionMap[menuId][moduleId] = p.id;
      });

      const response = {
        success: true,
        data: {
          permission: permissionMap,
          menu: menu,
          module: module
        }
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      await sequelize.transaction(async t => {
        const createdRole = await Role.create(
          {
            name: req.body.name,
            description: req.body.description || null
          },
          { transaction: t }
        );

        const permission = req.body.permission;
        if (permission.length > 0) {
          await createdRole.setPermissions(permission, { transaction: t });
        }
      });

      return res.status(200).json({ success: true, message: "Data Created" });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const role = await Role.findOrFail(
        {
          where: {
            id: req.params.id
          }
        },
        res
      );

      const permission = await role.getPermissions({
        attributes: ["id"],
        through: { attributes: [] }
      });
      const permissionId = permission.map(p => p.id);
      const response = {
        success: true,
        data: {
          role: new RoleResource(role).toJSON(),
          permission: permissionId
        }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const role = await Role.findOrFail(
        {
          where: { id: req.params.id }
        },
        res
      );

      await sequelize.transaction(async t => {
        await role.update(
          {
            name: req.body.name,
            description: req.body.description
          },
          { transaction: t }
        );

        const permission = req.body.permission;
        if (permission.length > 0) {
          await role.setPermissions(permission, { transaction: t });
        }
      });

      return res.status(200).json({ success: true, message: "Data Updated" });
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

module.exports = RoleController;
