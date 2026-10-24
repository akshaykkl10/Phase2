import z from "zod";
import { Role } from "../../generated/enums.js";

const createUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().min(1),
    password: z.string().trim().min(8),
    role: z.nativeEnum(Role).default(Role.USER)
})

export type CreateUserInput = z.infer<typeof createUserSchema>