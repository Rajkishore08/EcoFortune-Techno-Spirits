const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/:userId', portfolioController.getUserPortfolio);

module.exports = router;