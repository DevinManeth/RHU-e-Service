const express = require("express");
const { createJobOwner, getAllJobOwners } = require("../controllers/jobOwnerController");

const router = express.Router();

router.post("/jobowners", createJobOwner);  // save form data
router.get("/jobowners", getAllJobOwners); // fetch all records (optional)

module.exports = router;
