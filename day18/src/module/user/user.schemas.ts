import z, { email } from "zod";
import { Role } from "../../generated/enums.js";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional()
});

export const createUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.email(),
    password: z.string().trim().min(8),
    role: z.nativeEnum(Role).default(Role.USER)
})

export const userIdParamSchema = z.object({
  id: z.string().min(1)
});


export const listUserSchema = paginationQuerySchema.extend({
    role: z.nativeEnum(Role).default(Role.USER)
})


export type CreateUserInput = z.infer<typeof createUserSchema>

export type ListUserInput = z.infer<typeof listUserSchema>
