const mongoose = require("mongoose");

const JobOwnerSchema = new mongoose.Schema({
  name: String,
  registrationNo: String,
  faculty: String,
  graduationYear: String,
  currentJob: String,
  gender: String,
  employmentType: String,
  monthlyIncome: String,
  industry: String,
}, { timestamps: true });

module.exports = mongoose.model("JobOwner", JobOwnerSchema);