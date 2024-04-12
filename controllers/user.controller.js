// controllers/user.controller.js
const { validationResult } = require('express-validator');
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');

const UserController = {
  /**
   * Registra un nuevo usuario administrador.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  registerAdmin: async (req, res, next) => {
    try {
      const userData = req.body;
      const validationErrors = validationResult(req);
      if (validationErrors.errors) {
        return res.status(400).json({ errors: validationErrors.errors });
      }
      const user = await UserService.registerAdmin(userData, req.user);
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      console.error('Error al registrar usuario administrador:', error);
      
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  /**
   * Registra un nuevo usuario.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  register: async (req, res, next) => {
    try {
      const userData = req.body;
      const validationErrors = validationResult(req);
      const user = await UserService.register(userData);
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      if (error.errors) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  /**
   * Inicia sesión de un usuario.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  login: async (req, res, next) => {
    try {
      const credentials = req.body;
      const validationErrors = validationResult(req);
      const token = await AuthService.loginUser(credentials, validationErrors);
      res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.errors) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  /**
   * Obtiene todos los usuarios registrados.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers(req.user);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },

  /**
   * Obtiene un usuario por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  getUserByUserId: async (req, res, next) => {
    try {
      const userId = req.params._id;
      const user = await UserService.getUserByUserId(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  /**
   * Obtiene un usuario con sus detalles y CV.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  getUserWithDetailsAndCV: async (req, res, next) => {
    try {
      const userId = req.params._id;
      const user = await UserService.getUserWithDetailsAndCV(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener usuario con detalles y CV:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
};

module.exports = UserController;