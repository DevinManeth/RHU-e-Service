const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({}, { strict: false, collection: 'results' });
// 'strict: false' lets us keep your Atlas document as-is.

module.exports = mongoose.model('Result', ResultSchema);