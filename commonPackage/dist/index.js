"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInputSchema = void 0;
const zod_1 = require("zod");
// zod object
exports.signupInputSchema = zod_1.z.object({
    username: zod_1.z.string().min(5).max(20),
    password: zod_1.z.string().min(8).max(20)
});
