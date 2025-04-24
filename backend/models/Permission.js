const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");

class Permission extends Model {}
Permission.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permission",
    timestamps: false,
    underscored: true
  }
);

applyFindOrFail(Permission);
setImmediate(() => {
  Permission.belongsToMany(sequelize.models.Role, {
    through: "role_permission",
    foreignKey: "permission_id",
    timestamps: false
  });
});

module.exports = Permission;
