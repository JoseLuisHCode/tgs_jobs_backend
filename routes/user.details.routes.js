// routes/user.details.routes.js
const express = require('express');
const router = express.Router();
const UserDetailsController = require('../controllers/user.details.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user-details/:userId', authMiddleware.authenticate, UserDetailsController.getUserDetailsByUserId);
router.put('/user-details/:userId', authMiddleware.authenticate, UserDetailsController.updateUserDetailsByUserId);

module.exports = router;