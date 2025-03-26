const { DataTypes, Model } = require("sequelize"); // Import DataTypes
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");
const Product = require("./Product");

class Category extends Model {}
Category.init(
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
    sequelize,
    modelName: "Category",
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
// Category.hasMany(Product, { foreignKey: "category_id", as: "product" });
setImmediate(() => {
  Category.hasMany(sequelize.models.Product, {
    foreignKey: "category_id",
    as: "product"
  });
});

module.exports = Category;
