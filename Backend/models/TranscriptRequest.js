const mongoose = require('mongoose');

const TranscriptRequestSchema = new mongoose.Schema({
  // from labels
  fullName: { type: String, required: true },
  address:  { type: String, required: true },
  email:    { type: String, required: true },
  registrationNumber: { type: String, required: true },
  yearOfAdmission:    { type: String, required: true },
  contactNumber:      { type: String, required: true },
  degreeName:         { type: String, required: true },
  numberOfCopies:     { type: Number, required: true },
  effectiveDate:      { type: Date,   required: true },

  // files
  paymentReceiptPath: { type: String, required: true },

  // meta
  username:  { type: String, required: true }, // from JWT
  requestId: { type: String, required: true, unique: true },
  status:    { type: String, default: 'waiting' },
  subDate:   { type: Date,   default: () => new Date() },
  estDate:   { type: Date }, // we’ll set +14 days by default
}, { timestamps: true });

module.exports = mongoose.model('TranscriptRequest', TranscriptRequestSchema);
