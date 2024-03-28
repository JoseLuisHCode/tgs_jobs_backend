// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController');


// Obtener todas las vacantes
router.get('/jobs', jobController.getAllJobs );

// Obtener una vacante por su ID
router.get('/jobs/:id', jobController.getJobById );

// Crear una nueva vacante
router.post('/jobs', authMiddleware.authenticate, authMiddleware.isAdmin, jobController.createJob );

// Actualizar una vacante
router.put('/jobs/:id', authMiddleware.authenticate, authMiddleware.isAdmin, jobController.updateJob );

// Eliminar una vacante
router.delete('/jobs/:id', authMiddleware.authenticate, authMiddleware.isAdmin, jobController.deleteJob );

module.exports = router;
