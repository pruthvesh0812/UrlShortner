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
/*

/url/shorten - post - shorten url
/urlShortener/:urlId - post - redirect to original url

/url/allUrls - get - get all shortened urls

*/
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BaseUrl = process.env.BASE_URL;
router.post("/shorten", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    console.log(userId, "id");
    const user = yield db_1.User.findById({ _id: userId });
    if (user) {
        const { originUrl } = req.body;
        const oriUrl = new db_1.ShortenedUrls({ origin: originUrl });
        yield oriUrl.save();
        const shortendEndPoint = yield db_1.ShortenedUrls.findOne({ origin: originUrl });
        if (shortendEndPoint) {
            user.urlIds.push(shortendEndPoint._id);
            yield user.save();
            console.log(shortendEndPoint._id, "url new");
            res.json({ message: "url shortened successfully", shortened: `${BaseUrl}/urlShortener/${shortendEndPoint._id}` });
        }
        else {
            res.json({ message: "No such Url found" });
        }
    }
    else {
        res.json({ message: "No such User Found" });
    }
}));
exports.default = router;
