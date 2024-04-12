// routes/index.js (Archivo principal de rutas)

const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const vacancyRoutes = require('./vacancy.router');
const applicationRoutes = require('./application.routes');
const userDetailsRoutes = require('./user.details.routes'); 
const userCVRoutes = require('./user.cv.routes'); 

router.use('/user', userRoutes);
router.use('/vacancy', vacancyRoutes);
router.use('/application', applicationRoutes);
router.use('/user-details', userDetailsRoutes); 
router.use('/user-cv', userCVRoutes); 

module.exports = router;