const User = require("../models/User");
const logger = require("../config/logger");
const sequelize = require("../config/db");

async function getUser(req, res, next) {
  try {
    // const [users, metadata] = await sequelize.query("SELECT * FROM users");
    // logger.info(users);
    const user = await User.findOne({
      where: {
        id: req.user.id
      },
      attributes: ["id", "name", "email", "role_id"]
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser
};
