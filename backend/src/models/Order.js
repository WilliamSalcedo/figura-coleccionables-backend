const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "pagado",
        "enviado",
        "entregado",
        "cancelado",
      ),
      defaultValue: "pendiente",
    },
    direccion_envio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "pedidos",
    timestamps: true,
  },
);

module.exports = Order;
