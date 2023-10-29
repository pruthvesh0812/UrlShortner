import {z} from "zod"

// zod object
export const signupInputSchema = z.object({
    username: z.string().min(5).max(20),
    password: z.string().min(8).max(20)
})

//type of the object
        //type 
export type signupInput = z.infer<typeof signupInputSchema>



