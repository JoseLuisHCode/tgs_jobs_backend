// controllers/UserController.js
const { validationResult } = require('express-validator');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails'); 
const UserCV = require('../models/UserCV');
const jwt = require('jsonwebtoken');

const UserController = {

  registerAdmin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
          if (!req.user || req.user.rol !== 'admin'){ 
                          
        return res.status(403).json({ message: 'Acceso no autorizado para crear usuarios con rol de administrador.' });
      }
        const { correo, contrasena, rol } = req.body;
        const existingUser = await User.findOne({ correo });        

        if (existingUser) {
          return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
          
        const user = new User({ correo, contrasena, rol });
        await user.save();

        const userDetails = new UserDetails({
          userId: user._id,          
        });
        await userDetails.save();

        const userCV = new UserCV({
          userId: user._id,          
        });
        await userCV.save();

        user.userDetails = userDetails._id;
        user.userCV = userCV._id;
        await user.save();
  
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
      }

  },
  
  register: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {          
        const { correo, contrasena, rol } = req.body;
        const existingUser = await User.findOne({ correo });        

        if ( rol  == 'admin') {
          return res.status(403).json({ message: 'No autorizado para registrar cuenta con rol de administrador.' });
        }

        if (existingUser) {
          return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
  
        const user = new User({ correo, contrasena, rol });
        await user.save();

        const userDetails = new UserDetails({
          userId: user._id,          
        });
        await userDetails.save();

        const userCV = new UserCV({
          userId: user._id,          
        });
        await userCV.save();

        user.userDetails = userDetails._id;
        user.userCV = userCV._id;
        await user.save();
  
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
      }
  },

  login: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { correo, contrasena } = req.body;
      const user = await User.findOne({ correo });

      if (!user || !(await user.comparePassword(contrasena))) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      if (req.authError) {
        console.error('Error de autenticación:', req.authError);
        return res.status(401).json({ error: 'Token inválido.' });
      }

      const token = jwt.sign({ userId: user._id, rol: user.rol },
        process.env.JWT_SECRET,
         { expiresIn: '1h' });

      res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },


  getAllUsers: async (req, res) => {
    try {
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

  getUserByUserId: async (req, res) => {
    try {
      const user = await User.findById(req.params._id, { contrasena: 0});      
      if (!user) {
        return res.status(404).json({ message: 'Detalles de usuario no encontrados.' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener detalles de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getUserWithDetailsAndCV: async (req, res) => {
    try {
      const userId = req.params._id;
      const user = await User.findOne({ _id: userId })
        .populate({
          path: 'userDetails', // Nombre del campo a poblar en el modelo User
          model: 'UserDetails', // Modelo de los documentos a poblar
        })
        .populate({
          path: 'userCV', // Nombre del campo a poblar en el modelo User
          model: 'UserCV', // Modelo de los documentos a poblar
        });
    
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
    
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener usuario con detalles y CV:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
  
  
};



module.exports = UserController;
