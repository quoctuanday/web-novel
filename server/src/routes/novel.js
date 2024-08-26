const express = require('express');
const router = express.Router();
const novelController = require('../controllers/NovelController');

router.get('/showStory/:userName', novelController.showStory);
router.post('/addStory', novelController.addStory);

module.exports = router;
