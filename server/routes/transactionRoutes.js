const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/buy', transactionController.buyCrypto);
router.post('/sell', transactionController.sellCrypto);

module.exports = router;