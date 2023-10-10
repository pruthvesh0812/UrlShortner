/*
/signup - post - signup user generate jwt token
/login - post - login user

/user - get - me route

/url/shorten - post - shorten url
/urlShortner/:urlId - post - redirect to original url

/url/allUrls - get - get all shortened urls


*/

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoutes from './routes/auth';
import urlShortenerRoutes from './routes/urlShortener/shorten'
import urlRedirectRoutes from './routes/urlShortener/redirect'
const app = express();
dotenv.config();

const DATABASE_URL = process.env.DATABASE_LINK;
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/myUrl", urlShortenerRoutes);
app.use("/urlShortener",urlRedirectRoutes)


app.listen(PORT, () => {
    console.log("server running on port 3001");
})



mongoose.connect(DATABASE_URL, { dbName: 'UrlShortner' })