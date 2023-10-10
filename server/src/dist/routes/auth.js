"use strict";
/*
list of routes
- signup
- login
- user('me route')
*/
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
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET || '';
const router = express_1.default.Router();
// to signup
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username }); // unique username
    if (user) {
        return res.status(411).send({ message: "user already exists" });
    }
    const newUser = new db_1.User({ username, password });
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "user created successfully", token });
}));
// to login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: "user logged in successfully", token });
    }
    else {
        res.status(403).send({ message: "user not found" });
    }
}));
// to check if the user if logged in already
router.get("/user", middleware_1.authenticateJwt, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ id: req.headers.userId });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.json({ message: "user not logged in" });
    }
}));
exports.default = router;
