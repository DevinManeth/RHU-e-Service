const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  username: { type: String, required: true }, // same as users collection
  regNo: { type: String, required: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  degree: { type: String, required: true }
});

module.exports = mongoose.model('Info', infoSchema);