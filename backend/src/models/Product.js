const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precio_descuento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoria_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alto_cm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ancho_cm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso_gr: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    edicion: {
      type: DataTypes.ENUM("estandar", "especial", "limitada"),
      defaultValue: "estandar",
    },
    numero_serie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "productos",
    timestamps: true,
  },
);

module.exports = Product;
