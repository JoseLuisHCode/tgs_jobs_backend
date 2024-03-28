// controllers/UserCVController.js
const UserCV = require('../models/UserCV');
const UserDetails = require('../models/UserDetails');

const UserCVController = {
  
  getUserCVByUserId: async (req, res) => {
    try {
      const userCV = await UserCV.findOne({ userId: req.params.userId });
      if (!userCV) {
        return res.status(404).json({ message: 'CV de usuario no encontrado.' });
      }
      res.status(200).json(userCV);
    } catch (error) {
      console.error('Error al obtener CV de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  updateUserCVByUserId: async (req, res) => {
    try {
      const userCV = await UserCV.findOneAndUpdate(
        { userId: req.params.userId },
        req.body,
        { new: true }
      );
      if (!userCV) {
        return res.status(404).json({ message: 'CV de usuario no encontrado.' });
      }
      res.status(200).json(userCV);
    } catch (error) {
      console.error('Error al actualizar CV de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
};

module.exports = UserCVController;