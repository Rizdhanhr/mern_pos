const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helper/findOrFailHelper");
const logger = require("../config/logger");

const Brand = sequelize.define(
  "Brand",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER
      // allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER
      // allowNull: false
    }
  },
  {
    tableName: "brand",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (brand, options) => {
        const userId = options.user.id; // Ambil userId dari options
        if (userId) {
          brand.created_by = userId;
          brand.updated_by = userId; // Asumsi updated_by sama dengan created_by saat pembuatan
        }
      },
      beforeUpdate: async (brand, options) => {
        const userId = options.user.id; // Ambil userId dari options
        if (userId) {
          brand.updated_by = userId; // Asumsi updated_by sama dengan created_by saat pembuatan
        }
      }
    }
  }
);

applyFindOrFail(Brand);

module.exports = Brand;
