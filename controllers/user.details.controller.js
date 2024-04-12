// controllers/user.details.controller.js

const UserDetails = require('../models/UserDetails');
const UserDetailsService = require('../services/user.details.service');

const UserDetailsController = {

    /**
   * Obtiene detalles del usuario por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   */

  getUserDetailsByUserId: async (req, res) => {
    try {      
      const userId = req.params.userId;
      const userDetails = await UserDetailsService.getUserDetailsByUserId(userId);      
      res.status(200).json(userDetails);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  /**
   * Actualiza detalles del usuario por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   */

  updateUserDetailsByUserId: async (req, res) => {
    try {
      const userData = req.body;
      const userId = req.params.userId;
      const userDetails = await UserDetailsService.updateUserDetailsByUserId(userId, userData);      
      res.status(200).json(userDetails);
    } catch (error) {
      console.error('Error al actualizar detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
  
};

module.exports = UserDetailsController;