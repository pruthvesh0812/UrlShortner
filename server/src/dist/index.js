"use strict";
/*
/signup - post - signup user generate jwt token
/login - post - login user

/user - get - me route

/url/shorten - post - shorten url
/urlShortner/:urlId - post - redirect to original url

/url/allUrls - get - get all shortened urls


*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const shorten_1 = __importDefault(require("./routes/urlShortener/shorten"));
const redirect_1 = __importDefault(require("./routes/urlShortener/redirect"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const DATABASE_URL = process.env.DATABASE_LINK;
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/myUrl", shorten_1.default);
app.use("/urlShortener", redirect_1.default);
app.listen(PORT, () => {
    console.log("server running on port 3001");
});
mongoose_1.default.connect(DATABASE_URL, { dbName: 'UrlShortner' });
