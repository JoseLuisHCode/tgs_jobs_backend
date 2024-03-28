// controllers/UserDetailsController.js
const UserDetails = require('../models/UserDetails');
const UserCV = require('../models/UserCV');

const UserDetailsController = {

  getUserDetailsByUserId: async (req, res) => {
    try {
      const userDetails = await UserDetails.findOne({ userId: req.params.userId });      
      if (!userDetails) {
        return res.status(404).json({ message: 'Detalles de usuario no encontrados.' });
      }
      res.status(200).json(userDetails);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  updateUserDetailsByUserId: async (req, res) => {
    try {
      const userDetails = await UserDetails.findOneAndUpdate(
        { userId: req.params.userId },
        req.body,
        { new: true }
      );
      if (!userDetails) {
        return res.status(404).json({ message: 'Detalles de usuario no encontrados.' });
      }
      res.status(200).json(userDetails);
    } catch (error) {
      console.error('Error al actualizar detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
  
};

module.exports = UserDetailsController;