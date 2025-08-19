const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Route to handle login

router.post('/login', authController.login);

// Route to handle register
router.post('/register', authController.register);

// Route to request a password reset (sends reset email)
router.post('/request-password-reset', authController.requestresetpassword);

// Route to handle password reset submission (Post form with new password)
router.post('/reset-password/:randomString', authController.resetPassword);

module.exports = router;