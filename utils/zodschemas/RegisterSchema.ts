import { z } from "zod";

const RegisterSchema = z.object({
  ime: z.string({
    invalid_type_error: "Name must be a string"
  })
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be up to 30 characters long'),

  prezime: z.string({
    invalid_type_error: "Last name must be a string"
  })
    .trim()
    .min(1, 'Last name is required')
    .min(3, 'Last name must be at least 3 characters long')
    .max(30, 'Last name must be up to 30 characters long'),

  username: z.string({
    invalid_type_error: "Username must be a string"
  })
    .trim()
    .min(1, 'Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(25, 'Username must be up to 25 characters long'),

  email: z.string({
    invalid_type_error: "Email must be a string"
  })
    .trim()
    .min(1, 'Email is required')
    .email("Invalid email address"),

  BrTelefona: z.string({
    invalid_type_error: "Phone number must be a string"
  })
    .trim()
    .min(1, 'Phone number is required')
    .min(10, "Phone number must be at least 10 digits") 
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  password: z.string({
    invalid_type_error: "Password must be a string"
  })
    .trim()
    .min(1, 'Password is required')
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot exceed 20 characters"),
})

export default RegisterSchema;