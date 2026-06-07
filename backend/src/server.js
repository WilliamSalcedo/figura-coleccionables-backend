const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa ✓');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados ✓');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT} ✓`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

start();