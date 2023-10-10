"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET || '';
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // to ensure user is an object
            if (typeof (user) == 'string') {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            req.headers.userId = user.id;
            next();
        });
    }
    else {
        return res.status(401).send({ message: "authorization error" });
    }
};
exports.authenticateJwt = authenticateJwt;
