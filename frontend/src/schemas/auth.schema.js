import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),

  roomNumber: z.string().min(1, "Room number is required"),

  email: z.string().email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
