import { z } from "zod";

const RegisterSchema = z.object({
  firstName: z.string({
    invalid_type_error: "Name must be a string"
  })
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be up to 30 characters long'),

  lastName: z.string({
    invalid_type_error: "Last name must be a string"
  })
    .trim()
    .min(1, 'Last name is required')
    .min(3, 'Last name must be at least 3 characters long')
    .max(30, 'Last name must be up to 30 characters long'),

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

export default RegisterSchema;