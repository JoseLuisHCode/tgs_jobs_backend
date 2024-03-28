// routes/index.js (Archivo principal de rutas)

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');
const userDetailsRoutes = require('./userDetailsRoutes'); 
const userCVRoutes = require('./userCVRoutes'); 

router.use('/user', userRoutes);
router.use('/job', jobRoutes);
router.use('/application', applicationRoutes);
router.use('/user-details', userDetailsRoutes); 
router.use('/user-cv', userCVRoutes); 
module.exports = router;