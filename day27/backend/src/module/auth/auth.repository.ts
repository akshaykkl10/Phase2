import { prisma } from "../../db/prisma.js";
import type { Prisma, Role } from "../../generated/client.js";
import {debug} from './auth.router.js';

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


export class AuthRepository {
    async getUser(email: string) {
        debug('Fetching user')
        return prisma.users.findUnique({
            where: {
                email
            },
            include: userInclude
        })
    }
}