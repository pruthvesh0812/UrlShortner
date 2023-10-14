import express, { NextFunction, Request, Response } from 'express';
import { authenticateJwt } from '../../middleware';
import { User, ShortenedUrls } from '../../db';
import { ObjectId } from 'mongoose';
const router = express.Router();
import dotenv from 'dotenv'


dotenv.config();

const BASE_URL = process.env.BASE_URL;

type AllUrl ={
    shortUrl:string;
    originUrl:string;
}

router.get("/", authenticateJwt ,async (req:Request,res:Response) => {
    console.log("all url hit")
    const userId = req.headers.userId ;
    const user = await User.findById({_id:userId});
    if(user){
        console.log("user",user)
        const allUrlsArray:AllUrl[] = [];
        const originUrlArr = await user.populate("urlIds");
        
        console.log(originUrlArr.urlIds[0]);
        originUrlArr.urlIds.forEach((urlId,index)=>{   
            
            allUrlsArray.push({shortUrl:`${BASE_URL}/urlShortener/${urlId._id}` , originUrl:`${urlId._id}`});
        })

        res.json({message:"retrieval successful",allUrlsArray});
    }
    else{
        res.json({message:"User Not Found"});
    }

})

export default router;
