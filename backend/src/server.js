const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa ✓");
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados ✓");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error.message);
    console.log("Servidor iniciando sin base de datos...");
  }

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT} ✓`);
  });
};

start();
