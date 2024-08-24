const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.put('/updatedProfile/:id', userController.updatedProfile);

module.exports = router;
