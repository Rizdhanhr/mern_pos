const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");

class Module extends Model {}
Module.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ordering: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Module",
    tableName: "module",
    timestamps: false,
    underscored: true
  }
);

applyFindOrFail(Module);

module.exports = Module;
