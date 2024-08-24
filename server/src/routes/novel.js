const express = require('express');
const router = express.Router();
const novelController = require('../controllers/NovelController');

router.post('/addStory', novelController.addStory);

module.exports = router;
