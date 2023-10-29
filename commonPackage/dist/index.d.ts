import { z } from "zod";
export declare const signupInputSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signupInput = z.infer<typeof signupInputSchema>;
