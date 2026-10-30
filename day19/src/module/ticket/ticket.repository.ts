import type {  Prisma, TicketPriority, TicketStatus } from '../../generated/client.js';
import { prisma } from '../../db/prisma.js'
import {debug} from './ticket.router.js'

type TicketFilters = {
  status?: TicketStatus;
  priority?: TicketPriority;
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
        debug('Creating Ticket')
        return prisma.ticket.create({
            data: ticket,
            include: ticketInclude
        })
    }

    async findById(id: string) {
        debug('Finding Ticket')
        return prisma.ticket.findUnique({
        where: { id },
        include: ticketInclude
        });
    }
    async findMany (filters: TicketFilters, pagination: PaginationInput) {
        
        debug('Finding Tickets')
        const [item, total] = await Promise.all([
            prisma.ticket.findMany({
                where: filters,
                include: ticketInclude,
                orderBy: {
                    createdat: 'asc'
                },
                skip: (pagination.page - 1) * pagination.limit,
                take: pagination.limit
            }),
            prisma.ticket.count({where: filters})
        ])
        return {item, total}
    }
    async update (id: string, data: Prisma.TicketUncheckedUpdateInput) {
        debug('Updating Ticket')
        return prisma.ticket.update({
            where: {id},
            data,
            include: ticketInclude
        })
    }
    async delete (id: string) {
        debug('Deleting Ticket')
        return prisma.ticket.delete({
            where: {id},
            include: ticketInclude
        })
    }
}