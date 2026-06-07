const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pedido_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "detalle_pedido",
    timestamps: true,
  },
);

module.exports = OrderDetail;
