const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");


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
  Product.belongsTo(sequelize.models.Brand, {
    foreignKey: "brand_id",
    as: "brand"
  });
   Product.belongsTo(sequelize.models.Category, {
    foreignKey: "category_id",
    as: "category"
  });
});

// Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

module.exports = Product;
