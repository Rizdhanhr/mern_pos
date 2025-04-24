const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");



class Unit extends Model {}
Unit.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
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
    modelName: "Unit",
    tableName: "unit",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (data, options) => {
        const userId = options?.user?.id; 
        if (userId) {
          data.created_by = userId;
          data.updated_by = userId; 
        }
      },
      beforeUpdate: async (data, options) => {
        const userId = options?.user?.id;
        if (userId) {
          data.updated_by = userId;
        }
      },
    },
  }
);



applyFindOrFail(Unit);


setImmediate(() => {
  Unit.hasMany(sequelize.models.Product, {
    foreignKey: "unit_id",
    as: "product"
  });
});

module.exports = Unit;
