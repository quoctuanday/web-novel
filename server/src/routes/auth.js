const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/logout', authController.logOut);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
