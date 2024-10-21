// const express=require('express');
// const Detail=require('../UserSchema/studentdetail');
// const Router= require('router')
// const router = Router();
// router.get('/',(req,res)=>{
//     res.send(hello);
// })
// router.post('/studentdetail', async (req, res) => {
//     try {
//         const {id, name, email, phone,dob,fathername,mothername,gender,fatherphone,branch,address,course,rollno, city,pincode,collage,currcgpa,high,inter,gradcom,grad,image} = req.body;

//         // Check if all fields are filled
//         if (!id|| !name || !email || !phone ||!dob || !fathername || !mothername  ||!fatherphone || !branch || !address || !course || !rollno ||!city ||!pincode||!collage||!currcgpa||!high||!inter||!gradcom||!grad||!gender ||!image) {
//             return res.status(400).json({ error: "Fill all sections" });
//         }

//         // Check if the user already exists
//         const userExist = await Detail.findOne({ id});
//         if (userExist) {
//             return res.status(300).json({ error: "User already exists" });
//         }

//         // Create a new user 
//         const user = new Detail({id,name, email, phone,dob, fathername,mothername,gender,fatherphone,branch,address,course,rollno,city,pincode,collage,currcgpa,high,inter,gradcom,grad,image});


//         // Save the user to the database
//         await user.save();

//         // Respond with a success message and token
//         res.status(201).json({ message: "Registration Successful"});

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// router.get('/registration-sum', async (req, res) => {
//     try {
//         const sum = await Detail.countDocuments();
//         res.json({ sum });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch registration count' });
//     }
// });

// module.exports = router;
const express = require('express');
const Detail = require('../UserSchema/studentdetail');
const Router = require('router');
const nodemailer = require('nodemailer'); // Import nodemailer for email sending
const router = Router();

// GET request to test the route
router.get('/', (req, res) => {
    res.send('Hello');
});

// POST request for student detail registration
router.post('/studentdetail', async (req, res) => {
    try {
        console.log("yes i am working")
        const {
            id, name, email, phone, dob, fathername, mothername, gender, fatherphone, branch,
            address, course, rollno, city, pincode, collage, currcgpa, high, inter, gradcom, grad, image
        } = req.body;

        // Check if all fields are filled
        if (!id || !name || !email || !phone || !dob || !fathername || !mothername || !fatherphone || 
            !branch || !address || !course || !rollno || !city || !pincode || !collage || !currcgpa || 
            !high || !inter || !gradcom || !grad || !gender || !image) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        // Check if the user already exists
        const userExist = await Detail.findOne({ id });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Create a new user 
        const user = new Detail({
            id, name, email, phone, dob, fathername, mothername, gender, fatherphone, branch,
            address, course, rollno, city, pincode, collage, currcgpa, high, inter, gradcom, grad, image
        });

        // Save the user to the database
        await user.save();

        // Email setup using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gaur0423@gmail.com', 
                pass: 'qmtjxpxwmxfvnhtl' 
            }
        });

        // Email options
        const mailOptions = {
            from: 'gaur0423@gmail.com',
            to:`${email}`, 
            subject: `Welcome, ${name}! Here are your Login Details`,
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${dob}\nRegards, Your Team`
        };

      

        // Send email
        await transporter.sendMail(mailOptions);

        // Respond with a success message
        res.status(201).json({ message: "Registration Successful, Email sent!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET request to get the registration count
router.get('/registration-sum', async (req, res) => {
    try {
        const sum = await Detail.countDocuments();
        res.json({ sum });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch registration count' });
    }
});

module.exports = router;
