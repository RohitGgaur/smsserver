const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { 
    type: String, 
    enum: ['CSE', 'IT', 'ECE', 'EE', 'ME', 'CHE', 'CE'], 
    required: true 
  },
  code: { type: String, unique: true, required: true },
  credits: { type: Number, required: true },
  semester: { type: Number, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);
