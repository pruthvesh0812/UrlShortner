import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    urlIds: [{type:mongoose.Schema.Types.ObjectId,ref:'ShortenedUrls'}]
});

const shortenedUrlSchema = new mongoose.Schema({
    origin:String
})

export const User = mongoose.model("User",userSchema);
export const ShortenedUrls = mongoose.model("ShortenedUrls",shortenedUrlSchema);




