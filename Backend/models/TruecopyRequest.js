const mongoose = require('mongoose');

const TruecopyRequestSchema = new mongoose.Schema({
  // from labels
  fullName:       { type: String, required: true },
  studentId:      { type: String, required: true },
  faculty:        { type: String, required: true },
  degreeProgram:  { type: String, required: true },
  graduationYear: { type: String, required: true },
  email:          { type: String, required: true },
  contact:        { type: String, required: true },
  numberOfCopies: { type: Number, required: true },

  // files
  degreeCopyPath:    { type: String, required: true }, // uploaded degree certificate copy
  paymentReceiptPath:{ type: String, required: true },

  // meta
  username:  { type: String, required: true }, // from JWT
  requestId: { type: String, required: true, unique: true },
  status:    { type: String, default: 'waiting' },
  subDate:   { type: Date,   default: () => new Date() },
  estDate:   { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('TruecopyRequest', TruecopyRequestSchema);
