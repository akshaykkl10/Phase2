import { prisma } from "../../db/prisma.js"
import type { Prisma, Role } from "../../generated/client.js"

type PaginationInput = {
  page: number;
  limit: number;
};

type UserFilters = {
    role?: Role
}


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

export class UserRepository {
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
    async getUsers(filters: UserFilters, pagination: PaginationInput) {
        const where = {
            ...(filters.role? {role: filters.role}: {})
        }
        const [users, total] = await Promise.all([
            prisma.users.findMany({
                where,
                include: userInclude,
                skip: (pagination.page - 1) * pagination.limit,
                take: pagination.limit
            }),
            prisma.users.count({})
        ])
        return{ users, total}
    }
    async deleteUser(email: string) {
        return prisma.users.delete({
            where: {email}
        })
    }

}