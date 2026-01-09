import {z} from 'zod';

export const loginSchema = z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password must be atleast 6 characters")
});

export const registerSchema=z.object({
    name:z.string().min(2,"Name too short"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password too short")

});