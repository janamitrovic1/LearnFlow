import { z } from "zod";

const LoginSchema = z.object({
    username: z.string({
        invalid_type_error: "Username must be a string"
      })
        .trim()
        .min(1, 'Username is required')
        .min(5, 'Username must be at least 5 characters long')
        .max(25, 'Username must be up to 25 characters long'),

    password: z.string({
        invalid_type_error: "Password must be a string"
    })
        .trim()
        .min(1, 'Password is required')
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password cannot exceed 20 characters"),
})

export default LoginSchema;