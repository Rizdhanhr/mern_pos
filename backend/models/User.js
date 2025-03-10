const { Sequelize, DataTypes } = require("sequelize"); // Import DataTypes
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // created_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 1
    // },
    // updated_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 1
    // }
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

module.exports = User;
