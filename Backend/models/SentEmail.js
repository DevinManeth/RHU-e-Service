const mongoose = require('mongoose');

const sentEmailSchema = new mongoose.Schema({
  requestId: String,
  kind: { type: String, enum: ['truecopy', 'transcript'] },
  recipient: String,
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SentEmail', sentEmailSchema);
