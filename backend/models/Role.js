const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helper/findOrFailHelper");

const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "role",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

applyFindOrFail(Role);

module.exports = Role;
