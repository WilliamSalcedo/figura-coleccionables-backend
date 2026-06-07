const { Product, Category } = require("../models");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { activo: true },
      include: [
        {
          model: Category,
          attributes: ["id", "nombre"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["id", "nombre"],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener producto", error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        categoria_id: req.params.categoryId,
        activo: true,
      },
      include: [
        {
          model: Category,
          attributes: ["id", "nombre"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener productos por categoría",
        error: error.message,
      });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      precio_descuento,
      stock,
      categoria_id,
      imagen_url,
      marca,
      alto_cm,
      ancho_cm,
      peso_gr,
      edicion,
      numero_serie,
    } = req.body;

    const product = await Product.create({
      nombre,
      descripcion,
      precio,
      precio_descuento,
      stock,
      categoria_id,
      imagen_url,
      marca,
      alto_cm,
      ancho_cm,
      peso_gr,
      edicion,
      numero_serie,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar producto", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update({ activo: false });
    res.json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al desactivar producto", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
