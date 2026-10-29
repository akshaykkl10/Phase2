import z, { email } from "zod";
import { Role } from "../../generated/enums.js";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});



export const loginSchema = z.object({
  email: z.string().trim().min(1),
    password: z.string().trim().min(8)
})

const listUserSchema = z.object({
   role: z.nativeEnum(Role).default(Role.USER)
})

export type ListUserInput = z.infer<typeof listUserSchema>
export type PaginationInput = z.infer<typeof paginationQuerySchema>
