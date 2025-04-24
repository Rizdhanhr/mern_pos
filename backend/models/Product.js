const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");
const Unit = require('./Unit'); // ⬅️ langsung require
const Brand = require('./Brand');
const Category = require('./Category');


class Product extends Model {}
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_sell: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_buy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "product",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (product, options) => {
        const userId = options.user?.id;
        if (userId) {
          product.created_by = userId;
          product.updated_by = userId;
        }
      },
      beforeUpdate: async (product, options) => {
        const userId = options.user?.id;
        if (userId) {
          product.updated_by = userId;
        }
      },
    },
  }
);

applyFindOrFail(Product);

setImmediate(() => {
  Product.belongsTo(Brand, {
    foreignKey: "brand_id",
    as: "brand"
  });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category"
  });
  Product.belongsTo(Unit, {
    foreignKey: "unit_id",
    as: "unit"
  });
});

module.exports = Product;
