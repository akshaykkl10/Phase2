import { prisma } from "../../db/prisma.js";
import type { Prisma } from "../../generated/client.js";

const userInclude = {
    created_tickets: {
        select: {
            title: true,
            description: true,
            status: true,
            priority: true
        }
    },

    assigned_tickets: {
        select: {
            title: true,
            description: true,
            status: true,
            priority: true
        }
    },

    comments: {
        select: {
            body: true,
        }
    }
} satisfies Prisma.UsersInclude


export class AuthRepository {
    async register(input: Prisma.UsersUncheckedCreateInput) {
        return prisma.users.create({data: input})
    }
    async getUser(email: string) {
        return prisma.users.findUnique({
            where: {
                email
            },
            include: userInclude
        })
    }
}