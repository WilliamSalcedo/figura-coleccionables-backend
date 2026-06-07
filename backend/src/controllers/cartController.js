const { Cart, Product } = require("../models");

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { usuario_id: req.user.sub },
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "nombre",
            "precio",
            "precio_descuento",
            "imagen_url",
            "stock",
          ],
        },
      ],
    });
    res.json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener carrito", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;
    const usuario_id = req.user.sub;

    const product = await Product.findByPk(producto_id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    if (product.stock < cantidad) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    const existingItem = await Cart.findOne({
      where: { usuario_id, producto_id },
    });

    if (existingItem) {
      await existingItem.update({ cantidad: existingItem.cantidad + cantidad });
      return res.json(existingItem);
    }

    const cartItem = await Cart.create({ usuario_id, producto_id, cantidad });
    res.status(201).json(cartItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar al carrito", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    if (cartItem.usuario_id !== req.user.sub) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    await cartItem.update({ cantidad: req.body.cantidad });
    res.json(cartItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar carrito", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    if (cartItem.usuario_id !== req.user.sub) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    await cartItem.destroy();
    res.json({ message: "Item eliminado del carrito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar del carrito", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: { usuario_id: req.user.sub },
    });
    res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al vaciar carrito", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
