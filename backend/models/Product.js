const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helper/findOrFailHelper");
const logger = require("../config/logger");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_sell: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
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
    },
    status: {
      type: DataTypes.INTEGER
      // allowNull: false
    }
  },
  {
    tableName: "product",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (product, options) => {
        const userId = options.user.id; // Ambil userId dari options
        if (userId) {
          product.created_by = userId;
          product.updated_by = userId; // Asumsi updated_by sama dengan created_by saat pembuatan
        }
      },
      beforeUpdate: async (product, options) => {
        const userId = options.user.id; // Ambil userId dari options
        if (userId) {
          product.updated_by = userId; // Asumsi updated_by sama dengan created_by saat pembuatan
        }
      }
    }
  }
);

applyFindOrFail(Product);

module.exports = Product;
