const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  username:  { type: String, required: true }, // who submitted
  requestId: { type: String, required: true }, // link to the request
  desc:      { type: String, required: true }, // e.g., "Request transcript"
  subDate:   { type: Date,   default: () => new Date() },
  estDate:   { type: Date },
  status:    { type: String, default: 'waiting' }, // initial status
  type:      { type: String, enum: ['transcript', 'truecopy'], required: true }
  
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
