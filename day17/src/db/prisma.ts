import { env } from "../config/env.js"
import { PrismaClient } from "../generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL })
})

// prisma.$executeRaw`SELECT 1;`;
// console.log(await prisma.$executeRaw`SELECT 1;`)

