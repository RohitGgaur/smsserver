// Backend code in studentteacher.js
const express = require('express');
const router = express.Router();
const Student = require('../../UserSchema/studentdetail');
const Teacher = require('../../UserSchema/teacherdetail');


router.get('/students', async (req, res) => {
    const { id} = req.params; 

   
    try {
       
        const teacher = await Teacher.findOne(id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

      
        const students = await Student.find({ branch: teacher.department }); 
        
      
        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for this department' });
        }

        
        res.json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
