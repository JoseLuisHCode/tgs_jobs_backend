// routes/index.js (Archivo principal de rutas)

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const protectedRoutes = require('./protectedRoutes');
const jobRoutes = require('./jobRoutes');
const backofficeRoutes = require('./backofficeRoutes'); // Nueva importación

router.use('/api', userRoutes);
router.use('/api', protectedRoutes);
router.use('/api', jobRoutes);
router.use('/api/backoffice', backofficeRoutes); // Nueva ruta para el backoffice

module.exports = router;