// routes/userCVRoutes.js
const express = require('express');
const router = express.Router();
const UserCVController = require('../controllers/UserCVController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para el CV del usuario
router.get('/user-cv/:userId', authMiddleware.authenticate, UserCVController.getUserCVByUserId);
router.put('/user-cv/:userId', authMiddleware.authenticate, UserCVController.updateUserCVByUserId);

module.exports = router;