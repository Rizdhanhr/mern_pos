const { Sequelize, DataTypes, Model } = require("sequelize"); // Import DataTypes
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");
const Role = require("./Role");

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // created_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 1
    // },
    // updated_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 1
    // }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      attributes: { exclude: ["password"] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] } // ambil semua, termasuk password
      }
    }
  }
);

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

applyFindOrFail(User);

module.exports = User;
