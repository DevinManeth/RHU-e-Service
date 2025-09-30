const express = require('express');
const router = express.Router();
const emailCtrl = require('../controllers/email.controller');

// POST /api/email/send
router.post('/send', emailCtrl.sendDocument);

module.exports = router;
