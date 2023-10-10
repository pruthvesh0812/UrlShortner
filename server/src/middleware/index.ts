import express, { Request,Response,NextFunction }  from "express";

import jwt from "jsonwebtoken"
const router = express.Router();

import dotenv from 'dotenv'

dotenv.config()

const SECRET :string = process.env.SECRET || '';

export const authenticateJwt = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization; 
    if(authHeader){
        const token:string = authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            // to ensure user is an object
            if(typeof(user) == 'string') {
                return res.sendStatus(403);
            }
            if(!user){
                return res.sendStatus(403);
            }
            
            req.headers.userId = user.id;
            next();
        })
        
    }
    else{
        return res.status(401).send({message:"authorization error"});
    }
}

