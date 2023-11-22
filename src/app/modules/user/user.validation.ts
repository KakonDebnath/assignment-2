import { z } from 'zod';

const UserZodValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(3),
  password: z.string().max(20, "Password can not be more than 20 characters"),
  fullName: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  }),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(2)).min(1),
  address: z.object({
    street: z.string().min(3),
    city: z.string().min(3),
    country: z.string().min(3),
  }),
});


export default UserZodValidationSchema;