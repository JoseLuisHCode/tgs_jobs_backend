// protectedRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const protectedController = require('../controllers/protectedController');

// Ruta protegida que requiere autenticación
router.get('/protected', authMiddleware.authenticate, authMiddleware.isAdmin, protectedController.getProtectedRoute);

// router.get('/protected', authMiddleware.authenticate, authMiddleware.isAdmin, (req, res) => {
//     console.log('Ruta de prueba alcanzada');
//     res.json({ message: 'Ruta protegida.', userId: req.userId, rol: req.rol });
//   });

module.exports = router;