import type {  Prisma, TicketPriority, TicketStatus } from '../../generated/client.js';
import { prisma } from '../../db/prisma.js'

type TicketFilters = {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: string;
  createdById?: string;
};

type PaginationInput = {
  page: number;
  limit: number;
};

const ticketInclude = {
    created_by: {
        select: {
            name: true,
            email: true,
            role: true,
        }
    },
    assigned_to: {
        select: {
            name: true,
            email: true,
            role: true,
        }
    },
    category: {
        select: {
            name: true
        }
    }
} satisfies Prisma.TicketInclude

export class TicketRepository {
    async createTicket (ticket: Prisma.TicketUncheckedCreateInput) {
        return prisma.ticket.create({
            data: ticket,
            include: ticketInclude
        })
    }

    async findById(id: string) {
        return prisma.ticket.findUnique({
        where: { id },
        include: ticketInclude
        });
    }
    async findMany (filters: TicketFilters, pagination: PaginationInput) {
        const where = {
            ...(filters.status? {status: filters.status}: {}),
            ...(filters.priority? {priority: filters.priority}: {}),
            ...(filters.assignedToId? {assignedToId: filters.assignedToId}: {}),
            ...(filters.createdById? {createdById: filters.createdById}: {}),
        }
        const [item, total] = await Promise.all([
            prisma.ticket.findMany({
                where,
                include: ticketInclude,
                orderBy: {
                    createdat: 'asc'
                },
                skip: (pagination.page - 1) * pagination.limit,
                take: pagination.limit
            }),
            prisma.ticket.count({where})
        ])
        return {item, total}
    }
    async update (id: string, data: Prisma.TicketUncheckedUpdateInput) {
        return prisma.ticket.update({
            where: {id},
            data,
            include: ticketInclude
        })
    }
    async delete (id: string) {
        return prisma.ticket.delete({
            where: {id},
            include: ticketInclude
        })
    }
}