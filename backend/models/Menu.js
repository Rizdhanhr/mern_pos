const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");

class Menu extends Model {}
Menu.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Menu",
    tableName: "menu",
    timestamps: false,
    underscored: true
  }
);

applyFindOrFail(Menu);

module.exports = Menu;
