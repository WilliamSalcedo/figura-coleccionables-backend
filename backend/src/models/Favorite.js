const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "favoritos",
    timestamps: true,
  },
);

module.exports = Favorite;
