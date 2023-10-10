import express, { NextFunction, Request, Response } from 'express';
import { authenticateJwt } from '../../middleware';
import { User, ShortenedUrls } from '../../db';
import { ObjectId } from 'mongoose';
const router = express.Router();

router.get("/:urlId", async (req: Request, res: Response) => {
    const UrlEndPoint = req.params.urlId;
    const originUrl = await ShortenedUrls.findById({_id:UrlEndPoint});
    if(originUrl){

        res.redirect(originUrl.origin || '');
    }
});

router.get("/**", (req: Request, res: Response) => {
    res.status(411).send({error:"Not encoded by MyUrlShortener"})
})

export default router;