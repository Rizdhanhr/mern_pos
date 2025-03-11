const { Sequelize, DataTypes } = require("sequelize"); // Import DataTypes
const sequelize = require("../config/db");
const applyFindOrFail = require("../helper/findOrFailHelper");

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    tableName: "category",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
applyFindOrFail(Category);
module.exports = Category;
