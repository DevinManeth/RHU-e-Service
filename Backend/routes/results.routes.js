const express = require('express');
const router = express.Router();
const Results = require('../models/Results');

// Get results by username
router.get('/results/:username', async (req, res) => {
  try {
    const results = await Results.findOne({ username: req.params.username });
    if (results) {
    const courses = results.getCoursesAndGrades();
    courses.forEach(course => {
        console.log({
            code: course.code,
            name: results.getCourseName(course.code),
            credits: results.getCourseCredits(course.code),
            grade: course.grade
        });
    });
}
    if (!results) {
      return res.status(404).json({ message: 'Results not found' });
    }
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;