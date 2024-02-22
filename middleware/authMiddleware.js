// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization');

    // Imprime el token aquí
    console.log('Token proporcionado:', token);
    
    // Añade esta línea para verificar y remover el prefijo "Bearer"
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }

    // Extraer solo la parte del token sin el prefijo "Bearer"
    const tokenWithoutBearer = token.substring(7);
    console.log('Token sin bearer:', tokenWithoutBearer);

    try {
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);    
      console.log('Decoded Token:', decoded);
      req.user = { userId: decoded.userId, rol: decoded.rol }; // Configura req.user con la información del usuario
      next();
    } catch (error) {
      console.error('Error en la autenticación:', error.message);
      res.status(401).json({ error: 'Token inválido (middle).' });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const { userId, rol } = req.user; // Accede a req.user directamente

      console.log(userId, rol)

      // Verifica si el usuario está autenticado
      if (!userId || !rol) {
        return res.status(401).json({ message: 'Acceso no autorizado. Usuario no autenticado.' });
      }

      // Obtén el usuario desde la base de datos usando el userId del token
      const userInDb = await User.findById(userId);

      // Verifica si el usuario tiene el rol de administrador
      if (userInDb && userInDb.rol === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
      }
    } catch (error) {
      console.error('Error al verificar rol de administrador:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  },
};

module.exports = authMiddleware;
