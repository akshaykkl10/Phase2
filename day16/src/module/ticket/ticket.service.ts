import { Prisma } from "../../generated/client.js";
import { TicketPriority, TicketStatus } from "../../generated/enums.js";
import { TicketRepository } from "./ticket.repository.js";
import type { CreateTicketInput, ListTicketsInput, UpdateTicketsInput } from "./ticket.schema.js";

const repository = new TicketRepository()

export class TicketService {
    async createTicket(input: CreateTicketInput) {
        return repository.createTicket({
            title: input.title,
            description: input.description,
            priority: input.priority,
            category_id: input.category_id,
            created_by_id: input.created_by_id
        })
    }
    async showTicketById (ticketId: string) {
        const ticket = await repository.findById(ticketId);

        if (!ticket) {
        throw new Error('TICKET_NOT_FOUND');
        }

        return ticket;
    }

    async listTickets(query: ListTicketsInput) {
        const filters: Partial<{
            status: TicketStatus;
            priority: TicketPriority;
        }> = {};

        if (query.status) {
            filters.status = query.status;
        }
        
        if (query.priority) {
            filters.priority = query.priority;
        }
        const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
        console.log(page, limit, filters)   
        const { item, total } = await repository.findMany(filters, {
            page,
            limit
        });
        return {
            data: item,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }
    async updateTicket(ticketId: string, input: UpdateTicketsInput) {
        const updateData: Prisma.TicketUncheckedUpdateInput= {}
        if (input.title !== undefined) updateData.title = input.title;

        if (input.description !== undefined) updateData.description = input.description;

        if (input.priority !== undefined) updateData.priority = input.priority;
        return repository.update(ticketId,updateData)
    }
    async deleteTicket (ticketId: string) {
        return repository.delete(ticketId)
    }
}