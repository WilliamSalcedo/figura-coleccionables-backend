const { Favorite, Product } = require("../models");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
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
            "marca",
            "edicion",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener favoritos", error: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { producto_id } = req.body;
    const usuario_id = req.user.sub;

    // Verificar que el producto existe
    const product = await Product.findByPk(producto_id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar si ya está en favoritos
    const existing = await Favorite.findOne({
      where: { usuario_id, producto_id },
    });
    if (existing) {
      return res.status(400).json({ message: "Producto ya está en favoritos" });
    }

    const favorite = await Favorite.create({ usuario_id, producto_id });
    res.status(201).json(favorite);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar favorito", error: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorito no encontrado" });
    }

    if (favorite.usuario_id !== req.user.sub) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    await favorite.destroy();
    res.json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar favorito", error: error.message });
  }
};

const checkFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      where: {
        usuario_id: req.user.sub,
        producto_id: req.params.productoId,
      },
    });
    res.json({ isFavorite: !!favorite, favoriteId: favorite?.id || null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar favorito", error: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
};
