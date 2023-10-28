"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const db_1 = require("../../db");
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL;
router.get("/", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("all url hit");
    const userId = req.headers.userId;
    const user = yield db_1.User.findById({ _id: userId });
    if (user) {
        let allUrlsArray = [];
        const originUrls = yield db_1.ShortenedUrls.find({ _id: { $in: user.urlIds } });
        console.log(originUrls);
        if (originUrls) {
            user.urlIds.forEach((urlId, index) => {
                allUrlsArray.push({
                    shortUrl: `${BASE_URL}/urlShortener/${urlId._id}`,
                    originUrl: ''
                });
            });
            res.json({ message: "retrieval successful", allUrlsArray, originUrls });
        }
        else {
            res.json({ message: "No shortened Urls" });
        }
    }
    else {
        res.json({ message: "User Not Found" });
    }
}));
exports.default = router;
