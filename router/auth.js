const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../UserSchema/studentdetail');
const Teacher = require('../UserSchema/teacherdetail');
const jwt = require('jsonwebtoken');
const Router = require('router');
const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/signinuser', async (req, res) => {
  // Log the incoming request body
  console.log('Request Body:', req.body);

  const { email, dob, userType } = req.body;


  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  if (!dob) {
    return res.status(400).json({ message: 'Date of birth is required.' });
  }
  if (!userType) {
    return res.status(400).json({ message: 'User type is required.' });
  }
  
  try {
    let formattedDob;

    if (userType === 'student') {
      if (dob && typeof dob === 'string') {
        formattedDob = dob.split('/').reverse().join('-');
        console.log("Student");
      } else {
        return res.status(400).json({ message: 'Invalid date of birth format.' });
      }
      // console.log('Formatted DOB for Student:', formattedDob);
      console.log(dob + ' '+ formattedDob)
      user = await Student.findOne({ email, dob: formattedDob });
      // console.log(user);

    } 
    else if (userType === 'teacher') {
      console.log("teacher");
      if (dob && typeof dob === 'string') {
        console.log("teacher1");
  formattedDob = dob.split('/').reverse().join('-');
}
 else {
  console.log("teachererror");
        return res.status(400).json({ message: 'Invalid date of birth format.' });
      }
       console.log('Formatted DOB for Teacher:', formattedDob);
      user = await Teacher.findOne({ email, dob: formattedDob });

    } else {
      return res.status(400).json({ message: 'Invalid user type.' });
    }
// console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
