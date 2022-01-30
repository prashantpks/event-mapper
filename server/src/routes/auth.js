const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {body,validationResult } = require('express-validator');
const fetchuser = require('../middlewares/fetchuser');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//ROUTE1: Create a user uing: POST /api/auth/createuser, Doesn't require authentication
router.post('/createuser',[
    body('email','Enter valid email').isEmail(),
    body('username','Name length atleast 4 characters').isLength({min:4}),
    body('password','Password length atleast 6 characters').isLength({ min: 6 }),
],async (req,res)=>{

    let success = false;
    
    //If there are errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,error: errors.array()});
    }

    try{
        //Check whether user with same email or username exist
        let user = await User.findOne({username:req.body.username});
        if(user){
            return res.status(400).json({success,error:"Sorry! this username already exists"});
        }
        user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"Sorry this email already registered"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            about:req.body.about,
            photo: req.body.photo
        });
        const data = {
            user:{
                id:user.id,
                username: user.username
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        success = true;
        return res.status(200).json({success,authToken,user});

    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});


//ROUTE 2: Login user using POST: api/auth/login Doesn't require authentication
router.post('/login',[
    body('username','Enter valid credentials').isLength({min:4}),
    body('password','Enter valid credentials').isLength({min:6}),
],async (req,res)=>{
    let success = false;

    //If errors in credentials
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,error: errors.array()});
    }

    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return res.status(400).json({success,error:"Invalid credentials"});
        }

        let password = req.body.password;
        let passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({success,error:"Invalid Credentials"});
        }

        const data = {
            user:{
                id:user.id,
                username: user.username
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        success = true;
        return res.status(200).json({success,authToken,user});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 3: Update user details using PUT: /api/auth/updateuser Require authentication
router.put('/updateuser',fetchuser, async (req,res)=>{
    let success = false;

    try{
        const userid = req.user.id;
        let user = await User.findById(userid).select('-password');
        const {username,email,photo,about} = req.body;
        let updatedUser = await User.findOne({username});
        
        if(username!==user.username){
            if(updatedUser){
                return res.status(400).json({success,error:"Username already exist"});
            }
        }

        updatedUser = await User.findOne({email});
        if(email!==user.email){
            if(updatedUser){
                return res.status(400).json({success,error:"Email already exist"});
            }
        }

        updatedUser = {
            username: username,
            email: email,
            about: about,
            photo: photo
        }

        user = await User.findByIdAndUpdate(userid,{$set : updatedUser}, {new:true});
        success = true;
        return res.status(200).json({success, user});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
