const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Order = require("./Order");
const OrderDetail = require("./OrderDetail");

User.hasMany(Cart, { foreignKey: "usuario_id" });
Cart.belongsTo(User, { foreignKey: "usuario_id" });

Category.hasMany(Product, { foreignKey: "categoria_id" });
Product.belongsTo(Category, { foreignKey: "categoria_id" });

User.hasMany(Order, { foreignKey: "usuario_id" });
Order.belongsTo(User, { foreignKey: "usuario_id" });

Product.hasMany(Cart, { foreignKey: "producto_id" });
Cart.belongsTo(Product, { foreignKey: "producto_id" });

Order.hasMany(OrderDetail, { foreignKey: "pedido_id" });
OrderDetail.belongsTo(Order, { foreignKey: "pedido_id" });

Product.hasMany(OrderDetail, { foreignKey: "producto_id" });
OrderDetail.belongsTo(Product, { foreignKey: "producto_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  Order,
  OrderDetail,
};
