const { Order, OrderDetail, Cart, Product } = require("../models");
const sequelize = require("../config/database");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { usuario_id: req.user.sub },
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              attributes: ["id", "nombre", "imagen_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener pedidos", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              attributes: ["id", "nombre", "imagen_url"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    if (order.usuario_id !== req.user.sub) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener pedido", error: error.message });
  }
};

const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { direccion_envio } = req.body;
    const usuario_id = req.user.sub;

    const cartItems = await Cart.findAll({
      where: { usuario_id },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    let total = 0;
    for (const item of cartItems) {
      const precio = item.Product.precio_descuento || item.Product.precio;
      total += precio * item.cantidad;
    }

    const order = await Order.create(
      {
        usuario_id,
        total,
        direccion_envio,
        estado: "pendiente",
      },
      { transaction },
    );

    for (const item of cartItems) {
      const precio = item.Product.precio_descuento || item.Product.precio;

      await OrderDetail.create(
        {
          pedido_id: order.id,
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: precio,
        },
        { transaction },
      );

      await item.Product.update(
        {
          stock: item.Product.stock - item.cantidad,
        },
        { transaction },
      );
    }

    await Cart.destroy({
      where: { usuario_id },
      transaction,
    });

    await transaction.commit();
    res.status(201).json(order);
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: "Error al crear pedido", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    await order.update({ estado: req.body.estado });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar pedido", error: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
