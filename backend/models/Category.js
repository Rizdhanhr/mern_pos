const { DataTypes } = require("sequelize"); // Import DataTypes
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
      type: DataTypes.INTEGER
    },
    updated_by: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: "category",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (category, options) => {
        const userId = options.user.id;
        if (userId) {
          category.created_by = userId;
          category.updated_by = userId;
        }
      },
      beforeUpdate: async (category, options) => {
        const userId = options.user.id;
        if (userId) {
          category.updated_by = userId;
        }
      }
    }
  }
);

applyFindOrFail(Category);
module.exports = Category;
