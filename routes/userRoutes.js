// userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');


// Rutas para la gestión de usuarios

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.get('/users', authMiddleware.authenticate, authMiddleware.isAdmin, UserController.getAllUsers);


// Ruta para el registro de usuario

router.post('/register', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const newUser = new User({ correo, contrasena });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    } else {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
});

// Ruta para el inicio de sesión

router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await User.findOne({ correo });

    console.log(user)

    if (!user || !(await user.comparePassword(contrasena))) {
      return res.status(401).json({ error: 'Credenciales inválidas1.' });
    }

    const token = jwt.sign({ userId: user._id, rol: user.rol },
       process.env.JWT_SECRET,
        { expiresIn: '1h' });

        // Imprime el token aquí
    console.log('Token generado:', token);

    res.status(200).json({ message: 'Inicio de sesión exitoso1.', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


module.exports = router;
