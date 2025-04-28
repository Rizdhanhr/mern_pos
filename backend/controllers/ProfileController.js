const User = require("../models/User");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

class ProfileController {
  static async index(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id
        },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Role,
            attributes: ["id", "name", "is_superadmin"],
            as: "role",
            include: [
              {
                model: Permission,
                attributes: ["slug"],
                as: "permission",
                through: {
                  attributes: []
                }
              }
            ]
          }
        ]
      });

      if (!user) return res.status(404).json({ message: "Data not found" });

      let response = { success: true, data: user.toJSON() };

      if (user.role.is_superadmin === 1) {
        const allPermissions = await Permission.findAll({
          attributes: ["slug"]
        });

        response.data.role.permission = allPermissions.map(p => ({
          slug: p.slug
        }));
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
