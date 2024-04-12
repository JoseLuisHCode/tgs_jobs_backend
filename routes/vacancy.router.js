// routes/vacancy.router.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const vacancyController = require('../controllers/vacancy.controller');


// Obtener todas las vacantes
router.get('/vacancy', vacancyController.getAllVacancy );

// Obtener una vacante por su ID
router.get('/vacancy/:id', vacancyController.getVacancyById );

// Crear una nueva vacante
router.post('/vacancy', authMiddleware.authenticate, authMiddleware.isAdmin, vacancyController.createVacancy );

// Actualizar una vacante
router.put('/vacancy/:id', authMiddleware.authenticate, authMiddleware.isAdmin, vacancyController.updateVacancy );

// Eliminar una vacante
router.delete('/vacancy/:id', authMiddleware.authenticate, authMiddleware.isAdmin, vacancyController.deleteVacancy );

module.exports = router;
