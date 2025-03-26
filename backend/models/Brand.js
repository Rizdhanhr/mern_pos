const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");


class Brand extends Model {}
Brand.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
  },
  {
    sequelize,
    modelName: "Brand",
    tableName: "brand",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (brand, options) => {
        const userId = options?.user?.id; // Gunakan optional chaining untuk mencegah error jika `options.user` undefined
        if (userId) {
          brand.created_by = userId;
          brand.updated_by = userId; // Asumsi updated_by sama dengan created_by saat pembuatan
        }
      },
      beforeUpdate: async (brand, options) => {
        const userId = options?.user?.id;
        if (userId) {
          brand.updated_by = userId;
        }
      },
    },
  }
);



applyFindOrFail(Brand);


setImmediate(() => {
  Brand.hasMany(sequelize.models.Product, {
    foreignKey: "brand_id",
    as: "product"
  });
});

module.exports = Brand;
