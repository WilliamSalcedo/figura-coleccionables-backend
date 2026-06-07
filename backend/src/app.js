const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.disable("x-powered-by");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "API Figuras Coleccionables funcionando ✓" });
});

app.use("/api/categorias", categoryRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/carrito", cartRoutes);
app.use("/api/pedidos", orderRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

module.exports = app;
