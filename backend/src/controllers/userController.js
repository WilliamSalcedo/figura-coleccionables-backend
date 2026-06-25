const { User } = require('../models');

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { nombre, apellido, telefono } = req.body;
    await user.update({ nombre, apellido, telefono });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cuenta', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile
};