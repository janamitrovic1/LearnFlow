import { z } from "zod";

const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: "Email must be a string"
      })
        .trim()
        .min(1, 'Email is required')
        .email("Invalid email address"),

    password: z.string({
        invalid_type_error: "Password must be a string"
    })
        .trim()
        .min(1, 'Password is required')
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password cannot exceed 20 characters"),
})

export default LoginSchema;