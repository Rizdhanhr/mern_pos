const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const applyFindOrFail = require("../helpers/findOrFailHelper");

class Role extends Model {}
Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    is_superadmin: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "role",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

applyFindOrFail(Role);
setImmediate(() => {
  Role.belongsToMany(sequelize.models.Permission, {
    through: "role_permission",
    foreignKey: "role_id",
    timestamps: false
  });
});

module.exports = Role;
