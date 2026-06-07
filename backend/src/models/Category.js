const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "categorias",
    timestamps: true,
  },
);

module.exports = Category;
