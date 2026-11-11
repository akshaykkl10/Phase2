import dotenv from "dotenv";
import {z} from "zod";
dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'deployment']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRES_IN: z.string().min(1),
    DATABASE_URL:z.string().min(1)
})

const parsed = envSchema.safeParse(process.env);

if(!parsed.success)  throw new Error(`Invalid environment variables: ${parsed.error.message}`)

export const env = parsed.data;