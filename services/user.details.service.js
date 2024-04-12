// services/user.details.service.js


const UserDetails = require('../models/UserDetails');


class UserDetailsService {

    /**
   * Obtiene los detalles del usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<UserDetails>} Objeto de usuario con detalles.
   */
  static async getUserDetailsByUserId(userId) {    
    const userDetails = await UserDetails.findOne({ userId }); 
    if (!userDetails) {
      throw new Error('Detalles de usuario no encontrados.');
    }
    return userDetails;
  }

   /**
   * Actualiza los detalles del usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @param {Object} body - ID del usuario.
   * @returns {Promise<UserDetails>} Actualizar los detalles del usuario.
   */
   static async updateUserDetailsByUserId(userId, body) {    
    const userDetails = await UserDetails.findOneAndUpdate(
        { userId },
        body,
        { new: true }
      ); 
    if (!userDetails) {
      throw new Error('Detalles de usuario no encontrados.');
    }
    return userDetails;
  }

}

module.exports = UserDetailsService;