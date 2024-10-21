const express=require('express');
const router = express.Router();
const Admin=require('../../UserSchema/admin.js');
router.get('/Admin/:id',async(req,res)=>{
    const id=await req.params.id;
    try {
        const user=await Admin.findOne({id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Admin', error });
    }
});
module.exports = router;