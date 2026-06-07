const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API Figuras Coleccionables funcionando ✓" });
});

// Rutas de la API (las iremos agregando)
// app.use('/api/productos', productosRoutes);
// app.use('/api/categorias', categoriasRoutes);
// app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/carrito', carritoRoutes);
// app.use('/api/pedidos', pedidosRoutes);

module.exports = app;
