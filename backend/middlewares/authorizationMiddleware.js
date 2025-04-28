const Role = require("../models/Role");
const User = require("../models/User");
const Permission = require("../models/Permission");

const authorizationMiddleware = permission => {
  return async (req, res, next) => {
    try {
      const permissionArray = Array.isArray(permission)
        ? permission
        : [permission];

      const user = await User.findOne({
        where: {
          id: req.user.id
        },
        include: {
          model: Role,
          as: "role",
          attributes: ["id", "name", "is_superadmin"],
          include: {
            model: Permission,
            as: "permission",
            attributes: ["slug"],
            through: { attributes: [] }
          }
        }
      });

      if (user.role.is_superadmin) {
        return next();
      }

      const userPermission = user.role.permission.map(p => p.slug);
      const hasPermission = permissionArray.some(p =>
        userPermission.includes(p)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Forbidden"
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
  };
};

module.exports = authorizationMiddleware;
