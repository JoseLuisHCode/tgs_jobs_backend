// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const registerValidationRules = [
    body('correo').trim().isEmail().withMessage('Ingrese un correo electrónico válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    
  ];
  
  const loginValidationRules = [
    body('correo').trim().isEmail().withMessage('Ingrese un correo electrónico válido'),
    body('contrasena').notEmpty().withMessage('La contraseña no puede estar vacía'),
    
  ];

  // Sanitización
const sanitizeRegister = [
  body('correo').normalizeEmail(),
];


router.post('/registeradmin', registerValidationRules, sanitizeRegister, authMiddleware.authenticate, authMiddleware.isAdmin, UserController.registerAdmin);
router.post('/register', registerValidationRules, sanitizeRegister, UserController.register);
router.post('/login', loginValidationRules, UserController.login);
router.get('/getusers', authMiddleware.authenticate, authMiddleware.isAdmin, UserController.getAllUsers);
router.get('/getusers/:_id', authMiddleware.authenticate, authMiddleware.isAdmin, UserController.getUserByUserId);
router.get('/getuserdetailscv/:_id', authMiddleware.authenticate, UserController.getUserWithDetailsAndCV);

module.exports = router;