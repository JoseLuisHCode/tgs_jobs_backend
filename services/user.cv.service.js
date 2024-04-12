// services/user.cv.service.js


const UserCV = require('../models/UserCV');


class UserCVService {

    /**
   * Obtiene la CV del usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<UserCV>} Objeto de usuario con CV.
   */
  static async getUserCVByUserId(userId) {    
    const userCV = await UserCV.findOne({ userId }); 
    if (!userCV) {
      throw new Error('Detalles de usuario no encontrados.');
    }
    return userCV;
  }

   /**
   * Actualiza la CV del usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @param {Object} body - ID del usuario.
   * @returns {Promise<UserCV>} Actualizar la CV del usuario.
   */
   static async updateUserCVByUserId(userId, body) {    
    const userCV = await UserCV.findOneAndUpdate(
        { userId },
        body,
        { new: true }
      ); 
    if (!userCV) {
      throw new Error('Detalles de usuario no encontrados.');
    }
    return userCV;
  }

}

module.exports = UserCVService;