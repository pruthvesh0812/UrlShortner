/*
list of routes
- signup
- login
- user('me route')
*/

import express, { NextFunction, Request, Response } from 'express';
import { authenticateJwt } from '../middleware';
import { User } from '../db';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET:string = process.env.SECRET || '';

const router = express.Router();


// to signup
router.post("/signup" , async (req:Request,res:Response)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username}); // unique username
    if(user){
       return res.status(411).send({message:"user already exists"});
    }
    const newUser = new User({ username , password });
    await newUser.save();
    const token = jwt.sign({id:newUser._id},SECRET,{expiresIn:'1h'});
    res.status(200).json({message:"user created successfully",token})
});


// to login
router.post("/login", async (req:Request,res:Response)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username,password});
    if(user){
        const token = jwt.sign({id:user._id},SECRET,{expiresIn:'1h'});
        res.json({message:"user logged in successfully",token});
    }
    else{
        res.status(403).send({message:"user not found"})
    }
})

// to check if the user if logged in already
router.get("/user" , authenticateJwt , async (req:Request,res:Response,next:NextFunction)=>{
    const user = await User.findOne({id:req.headers.userId});
    if(user){
        res.json({username:user.username});
    }
    else{
        res.json({message:"user not logged in"})
    }
});

export default router;