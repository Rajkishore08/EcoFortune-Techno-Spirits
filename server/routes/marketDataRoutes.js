const express = require('express');
const router = express.Router();
const marketDataController = require('../controllers/marketDataController');

router.get('/price/:symbol', marketDataController.getRealTimePrice);

module.exports = router;