const User = require("../models/User");
const logger = require("../config/logger");
const sequelize = require("../config/db");
const Role = require("../models/Role");

class UserController {
  static async getUser(req, res, next) {
    try {
      // const [users, metadata] = await sequelize.query("SELECT * FROM users");
      // logger.info(users);
      const user = await User.findOne({
        where: {
          id: req.user.id
        },
        attributes: ["id", "name", "email", "role_id"],
        include: [
          {
            model: Role,
            attributes: ["id", "name"],
            as: "role"
          }
        ]
      });

      if (!user) return res.status(404).json({ message: "Data not found" });

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
