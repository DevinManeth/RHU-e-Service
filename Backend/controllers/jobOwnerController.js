const JobOwner = require("../models/JobOwner");

exports.createJobOwner = async (req, res) => {
  try {
    const newJobOwner = new JobOwner(req.body);
    await newJobOwner.save();
    res.status(201).json({ message: "Form submitted successfully!", data: newJobOwner });
  } catch (error) {
    console.error("Error saving job owner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllJobOwners = async (req, res) => {
  try {
    const jobOwners = await JobOwner.find();
    res.json(jobOwners);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};