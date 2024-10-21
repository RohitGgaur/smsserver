const express = require('express');
const Subject = require('../UserSchema/Subject');
const student=require('../UserSchema/studentdetail');
const router = express.Router();
// Add subject
router.post('/add', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json({ message: 'Subject added successfully', subject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete subject
router.delete('/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update subject
router.put('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post('/:id/select-subjects', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      student.selectedSubjects = req.body.subjectIds;
      await student.save();
      res.json({ message: 'Subjects selected successfully', student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;
  