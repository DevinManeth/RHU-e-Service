const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const TranscriptCtrl = require('../controllers/transcript.controller');
const TruecopyCtrl = require('../controllers/truecopy.controller');

// Transcript: single file field named "paymentReceipt"
router.post('/transcripts/apply',
  upload.single('paymentReceipt'),
  TranscriptCtrl.applyTranscript
);

// Truecopy: two files: "degreeCopy" and "paymentReceipt"
router.post(
    '/truecopy/apply',
    upload.fields([{ name: 'degreeCopy', maxCount: 1 }, { name: 'paymentReceipt', maxCount: 1 }]),
    TruecopyCtrl.applyTruecopy
);

module.exports = router;
