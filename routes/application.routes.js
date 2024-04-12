// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/application.controller');

// Crear una nueva aplicación
router.post('/applications/:vacancyId', authMiddleware.authenticate, applicationController.createApplication );

// Obtener todas las aplicaciones
router.get('/applications', authMiddleware.authenticate, authMiddleware.isAdmin, applicationController.getAllApplications );

//Obtener aplicacion por vancante
router.get('/applications/:vacancyId', authMiddleware.authenticate, authMiddleware.isAdmin, applicationController.getApplicationsByVacancyId );

//Obtener aplicacion por userid
router.get('/appuserid', authMiddleware.authenticate, applicationController.getApplicationsByUserId );

// Aprobar o rechazar una aplicación específica
router.put('/applications/:id/:status', authMiddleware.authenticate, authMiddleware.isAdmin, applicationController.updateApplicationStatus );

// Borrar las aplicaciones seleccionadas por el usuario propietario
router.delete('/applicationsuser', authMiddleware.authenticate, applicationController.deleteApplicationsUser);

// Borrar las aplicaciones seleccionadas por el usuario Admin
router.delete('/applicationsadmin', authMiddleware.authenticate, authMiddleware.isAdmin, applicationController.deleteApplicationsAdmin);

module.exports = router;
