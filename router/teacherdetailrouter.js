const express=require('express');
const Detail=require('../UserSchema/teacherdetail.js');
const Router= require('router')
const nodemailer = require('nodemailer'); 
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})
router.post('/teacherdetail', async (req, res) => {
    try {
        const {id, name, email, phone,fathername,city,course,gender,grad,pincode,collage,department,address,researchpaper,dob,higheredu,position,experince,image } = req.body;

        // Check if all fields are filled
        if (!id|| !name || !email || !phone ||!dob||!city || !course ||!gender||!grad||!pincode||!collage || !fathername ||!department || !address || !researchpaper || !higheredu || !position || !experince || !image) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        // Check if the user already exists
        const userExist = await Detail.findOne({id});
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Create a new user 
        const user = new Detail({id,name, email, phone,dob,city,course,gender,grad,pincode,collage, fathername,department,address,researchpaper,higheredu,position,experince,image});


        // Save the user to the database
        await user.save();
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'gaur0423@gmail.com',
                pass:'mwbbymkwxmtdkbtk'
            }

        });
        const mailOptions={
            from:'gaur0423@gmail.com',
            to:`${email}`,
            subject:`Welcome, ${name}!,Here are your Login Details`,
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${dob}\nRegards, Your Team`
        };
        await transporter.sendMail(mailOptions);

        // Respond with a success message and token
        res.status(201).json({ message: "Registration Successful"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
});
router.get('/registration-count', async (req, res) => {
    try {
        const count = await Detail.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch registration count' });
    }
})
module.exports = router;