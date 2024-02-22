// UserController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const UserController = {
  register: async (req, res) => {
    // Implementa la lógica para registrar un nuevo usuario
    try {
        const { correo, contrasena } = req.body;
        const existingUser = await User.findOne({ correo });
  
        if (existingUser) {
          return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
  
        const user = new User({ correo, contrasena });
        await user.save();
  
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
      }
  },

  login: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
      const user = await User.findOne({ correo });

      if (!user || !(await user.comparePassword(contrasena))) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      if (req.authError) {
        console.error('Error de autenticación:', req.authError);
        return res.status(401).json({ error: 'Token inválido (controler).' });
      }

      const token = generateJwtToken(user);

      res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },


  getAllUsers: async (req, res) => {
    try {
      console.log('req.user:', req.user);
      if (!req.user || req.user.rol !== 'admin'){
        return res.status(403).json({ message: 'Acceso no autorizado (getAllUsers).' });
      }

      const users = await User.find({}, { contrasena: 0 }); // Excluye la contraseña de la respuesta
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },
  
};

function generateJwtToken(user) {
    return jwt.sign({ correo: user.correo, rol: user.rol }, 'secreto', { expiresIn: '1h' });
  }

module.exports = UserController;
