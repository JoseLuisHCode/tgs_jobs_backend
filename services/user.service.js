// services/user.service.js

const User = require('../models/User');
const UserDetails = require('../models/UserDetails');
const UserCV = require('../models/UserCV');
const Error = require('../middleware/errorHandlerMiddleware')

class UserService {
  /**
   * Registra un nuevo usuario administrador.
   * @param {Object} userData - Datos del usuario administrador a registrar.
   * @param {Object} authUser - Objeto de usuario autenticado.
   * @returns {Promise<User>} Usuario administrador registrado.
   */
  static async registerAdmin(userData, authUser) {
    try {
      // Verificar si el usuario autenticado tiene rol de administrador
      if (!authUser || authUser.rol !== 'admin') {
        throw new Error('Acceso no autorizado para crear usuarios con rol de administrador.');
      }

      // Crear un nuevo usuario administrador
      const user = await this.createUser(userData);

      // Crear detalles de usuario y CV
      const userDetails = await this.createUserDetails(user._id);
      const userCV = await this.createUserCV(user._id);

      // Asociar detalles de usuario y CV al usuario
      user.userDetails = userDetails._id;
      user.userCV = userCV._id;
      await user.save();

      return user;
      
    } catch (error) {
      throw new Error(error.message);
    }

  }

  /**
   * Registra un nuevo usuario.
   * @param {Object} userData - Datos del usuario a registrar.
   * @returns {Promise<User>} Usuario registrado.
   */
  static async register(userData) {
    // Verificar si el rol es administrador
    if (userData.rol === 'admin') {
      throw new Error('No autorizado para registrar cuenta con rol de administrador.');
    }

    // Crear un nuevo usuario
    const user = await this.createUser(userData);

    // Crear detalles de usuario y CV
    const userDetails = await this.createUserDetails(user._id);
    const userCV = await this.createUserCV(user._id);

    // Asociar detalles de usuario y CV al usuario
    user.userDetails = userDetails._id;
    user.userCV = userCV._id;
    await user.save();

    return user;
  }

  /**
   * Obtiene todos los usuarios registrados.
   * @param {Object} authUser - Objeto de usuario autenticado.
   * @returns {Promise<Array<User>>} Arreglo de usuarios.
   */
  static async getAllUsers(authUser) {
    // Verificar si el usuario autenticado tiene rol de administrador
    if (!authUser || authUser.rol !== 'admin') {
      throw new Error('Acceso no autorizado (getAllUsers).');
    }

    // Obtener todos los usuarios excluyendo las contraseñas
    const users = await User.find({}, { contrasena: 0 });
    return users;
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<User>} Objeto de usuario.
   */
  static async getUserByUserId(userId) {
    // Obtener el usuario excluyendo la contraseña
    const user = await User.findById(userId, { contrasena: 0 });
    if (!user) {
      throw new Error('Detalles de usuario no encontrados.');
    }
    return user;
  }

  /**
   * Obtiene un usuario con sus detalles y CV.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<User>} Objeto de usuario con detalles y CV.
   */
  static async getUserWithDetailsAndCV(userId) {
    // Obtener el usuario con sus detalles y CV
    const user = await User.findOne({ _id: userId })
      .populate({
        path: 'userDetails',
        model: 'UserDetails',
      })
      .populate({
        path: 'userCV',
        model: 'UserCV',
      });

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    return user;
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} userData - Datos del usuario a crear.
   * @returns {Promise<User>} Usuario creado.
   */
  static async createUser(userData) {
    const user = new User({ ...userData });
    await user.save();
    return user;
  }

  /**
   * Crea los detalles de un usuario en la base de datos.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<UserDetails>} Detalles de usuario creados.
   */
  static async createUserDetails(userId) {
    const userDetails = new UserDetails({ userId });
    await userDetails.save();
    return userDetails;
  }

  /**
   * Crea el CV de un usuario en la base de datos.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<UserCV>} CV de usuario creado.
   */
  static async createUserCV(userId) {
    const userCV = new UserCV({ userId });
    await userCV.save();
    return userCV;
  }
}

module.exports = UserService;