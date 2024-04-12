// controllers/user.cv.controller.js

const UserCVService = require('../services/user.cv.service');

const UserCVController = {

    /**
   * Obtiene CV del usuario por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   */

    getUserCVByUserId: async (req, res) => {
    try {      
      const userId = req.params.userId;
      const userCV = await UserCVService.getUserCVByUserId(userId);      
      res.status(200).json(userCV);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  /**
   * Actualiza la CV del usuario por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   */

  updateUserCVByUserId: async (req, res) => {
    try {
      const userData = req.body;
      const userId = req.params.userId;
      const userCV = await UserCVService.updateUserCVByUserId(userId, userData);      
      res.status(200).json(userCV);
    } catch (error) {
      console.error('Error al actualizar detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
  
};

module.exports = UserCVController;