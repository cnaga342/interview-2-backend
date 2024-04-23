// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Register route
router.post('/register', authController.register);

module.exports = router;
