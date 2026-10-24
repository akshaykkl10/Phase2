import z from "zod";
import { Role } from "../../generated/enums.js";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});


const createUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().min(1),
    password: z.string().trim().min(8),
    role: z.nativeEnum(Role).default(Role.USER)
})

const listUserSchema = z.object({
   role: z.nativeEnum(Role).default(Role.USER)
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type ListUserInput = z.infer<typeof listUserSchema>
export type PaginationInput = z.infer<typeof paginationQuerySchema>
