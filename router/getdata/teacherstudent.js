const express = require('express');
const router = express.Router();
const Student = require('../../UserSchema/studentdetail');
const Teacher = require('../../UserSchema/teacherdetail');

// Route to fetch teachers by student's department
router.get('/teachers', async (req, res) => {
    const { rollno } = req.query; // Use req.query to access query parameters

    try {
        // Find the student by their roll number
        const student = await Student.findOne({ rollno: rollno }); // Correct usage of findOne

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find teachers based on the student's branch (department)
        const teachers = await Teacher.find({ department: student.branch });

        if (teachers.length === 0) {
            return res.status(404).json({ message: 'No teachers found for this branch' });
        }

        // Send back the list of teachers
        res.json({ teachers }); // Correctly send 'teachers' in plural as expected by the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
