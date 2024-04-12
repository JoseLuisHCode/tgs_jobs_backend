// services/auth.service.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../utils/custom.error');

class AuthService {
  /**
   * Genera un token JWT a partir de los datos de usuario.
   * @param {Object} user - Objeto de usuario.
   * @returns {string} Token JWT generado.
   */
  static generateToken(user) {
    return jwt.sign({ userId: user._id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  /**
   * Registra un nuevo usuario en la base de datos.
   * @param {Object} userData - Datos del usuario a registrar.
   * @param {Object} validationErrors - Errores de validación.
   * @returns {Promise<User>} Usuario registrado.
   * @throws {CustomError} Si hay errores de validación o el correo electrónico ya está registrado.
   */
  static async registerUser(userData, validationErrors) {
    // Verificar si hay errores de validación
    if (!validationErrors.isEmpty()) {
      throw new CustomError('Errores de validación', 400, { errors: validationErrors.array() });
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ correo: userData.correo });
    if (existingUser) {
      throw new CustomError('El correo electrónico ya está registrado.', 409);
    }

    // Crear un nuevo usuario
    const user = new User({ ...userData });
    await user.save();

    return user;
  }

  /**
   * Autentica a un usuario con sus credenciales.
   * @param {Object} credentials - Credenciales del usuario (correo y contraseña).
   * @param {Object} validationErrors - Errores de validación.
   * @returns {Promise<string>} Token JWT generado.
   */
  static async loginUser(credentials, validationErrors) {
    // Verificar si hay errores de validación
    if (!validationErrors.isEmpty()) {
      throw new Error('Errores de validación', { errors: validationErrors.array() });
    }

    const { correo, contrasena } = credentials;
    const user = await User.findOne({ correo });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await user.comparePassword(contrasena))) {
      throw new Error('Credenciales incorrectas.');
    }

    // Generar y devolver un token JWT
    const token = this.generateToken(user);
    return token;
  }
}

module.exports = AuthService;