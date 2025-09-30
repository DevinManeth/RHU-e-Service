const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    IndexNo: { 
        type: String, 
        required: true 
    },
    Name: { 
        type: String, 
        required: true 
    },
    // Course codes and grades
    COM1112: { type: String },
    COM1123: { type: String },
    COM1213: { type: String },
    COM1223: { type: String },
    COM2113: { type: String },
    COM3b33: { type: String },
    MAT211b: { type: String },
    MAT212b: { type: String },
    AMT1221: { type: String },
    AMT1213: { type: String },
    GPA: { type: String }
}, { 
    strict: false,  // Allows for flexible document structure
    collection: 'results' 
});

// Helper method to get all courses and grades as an array
ResultSchema.methods.getCoursesAndGrades = function() {
    const courses = [];
    for (let key in this.toObject()) {
        // Check if the key is a course code (starts with COM, MAT, or AMT)
        if (key.match(/^(COM|MAT|AMT)/)) {
            courses.push({
                code: key,
                grade: this[key]
            });
        }
    }
    return courses;
};

// Function to get course name based on course code
ResultSchema.methods.getCourseName = function(courseCode) {
    const courseNames = {
        COM1112: 'Programming Concepts',
        COM1123: 'Database Management Systems',
        COM1213: 'Web Development',
        COM1223: 'Software Engineering',
        COM2113: 'Computer Networks',
        COM3b33: 'Advanced Programming',
        MAT211b: 'Mathematics for Computing',
        MAT212b: 'Advanced Mathematics',
        AMT1221: 'Applied Mathematics I',
        AMT1213: 'Applied Mathematics II'
    };
    return courseNames[courseCode] || courseCode;
};

// Function to get credit value for each course
ResultSchema.methods.getCourseCredits = function(courseCode) {
    const courseCredits = {
        COM1112: 2,
        COM1123: 3,
        COM1213: 3,
        COM1223: 3,
        COM2113: 3,
        COM3b33: 3,
        MAT211b: 2,
        MAT212b: 2,
        AMT1221: 2,
        AMT1213: 3
    };
    return courseCredits[courseCode] || 3; // Default to 3 credits if not specified
};

// Calculate GPA (if needed to recalculate)
ResultSchema.methods.calculateGPA = function() {
    const gradePoints = {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'E': 0.0,
        'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    const courses = this.getCoursesAndGrades();
    courses.forEach(course => {
        const credits = this.getCourseCredits(course.code);
        const gradePoint = gradePoints[course.grade] || 0;
        totalPoints += credits * gradePoint;
        totalCredits += credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
};

const Results = mongoose.model('Result', ResultSchema);

module.exports = Results;