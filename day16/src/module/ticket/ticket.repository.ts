import {  Prisma } from '../../generated/client.js';
import { prisma } from '../../db/prisma.js'

const ticketInclude = {} satisfies Prisma.ticketInclude

export class TicketRepository {
    async createTicket (ticket: Prisma.ticketUncheckedCreateInput) {
        return prisma.ticket.create({
            data: ticket,
            include: 
        })
    }
    async listTicket (filters: )
}