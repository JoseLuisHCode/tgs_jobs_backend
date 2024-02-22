// routes/backofficeRoutes.js

const express = require('express');
const router = express.Router();
const backofficeController = require('../controllers/backofficeController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas del backoffice
router.post('/jobs', authMiddleware.authenticate, authMiddleware.isAdmin, backofficeController.createJob);
router.get('/jobs', authMiddleware.authenticate, authMiddleware.isAdmin, backofficeController.getAllJobs);

module.exports = router;