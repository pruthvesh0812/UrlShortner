/*

/url/shorten - post - shorten url
/urlShortener/:urlId - post - redirect to original url

/url/allUrls - get - get all shortened urls

*/
import express, { NextFunction, Request, Response } from 'express';
import { authenticateJwt } from '../middleware';
import { User,ShortenedUrls } from '../db';
import { ObjectId } from 'mongoose';
const router = express.Router();
import dotenv from 'dotenv'

dotenv.config()

const BaseUrl:string = process.env.BASE_URL;

router.post("/shorten", authenticateJwt, async (req:Request,res:Response)=>{
    const userId = req.headers.userId;
    console.log(userId,"id")
    const user = await User.findById({_id:userId});
    if(user){
        const {originUrl} = req.body
        const oriUrl = new ShortenedUrls({origin:originUrl});
        await oriUrl.save();
    
        const shortendEndPoint= await ShortenedUrls.findOne({origin:originUrl})
        if(shortendEndPoint){
            user.urlIds.push(shortendEndPoint._id);
            await user.save();
            console.log(shortendEndPoint._id,"url new")
            res.json({message:"url shortened successfully",shortened:`${BaseUrl}/urlShortener/${shortendEndPoint._id}`})
        }
        else{
            res.json({message:"No such Url found"})
        }
        
    }
    else{
        res.json({message:"No such User Found"})
    }

 
})

export default router;