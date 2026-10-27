import { Prisma, type Ticket } from "../../generated/client.js";
import { Role, TicketPriority, TicketStatus } from "../../generated/enums.js";
import type { AuthUser } from "../../types.js";
import { TicketRepository } from "./ticket.repository.js";
import type { CreateTicketInput, ListTicketsInput, UpdateTicketsInput } from "./ticket.schema.js";

const repository = new TicketRepository()

function canViewTicket(user: AuthUser, ticket: Ticket) {
    switch (user.role) {
        case "ADMIN":
            return true;

        case "AGENT":
            return user.id == ticket.assigned_to_id || user.id == ticket.created_by_id            

        case "USER":
            return user.id == ticket.created_by_id            
                
        default:
            return false;
    }
}

export class TicketService {
    async createTicket(authUser: AuthUser, input: CreateTicketInput) {
        return repository.createTicket({
            title: input.title,
            description: input.description,
            priority: input.priority,
            category_id: input.category_id,
            created_by_id: authUser.id
        })
    }
    async showTicketById (authUser: AuthUser, ticketId: string) {
        const ticket = await repository.findById(ticketId);
        if(!canViewTicket(authUser, ticket!)) {
            throw new Error('FORBIDDEN')
        }
        if (!ticket) {
            throw new Error('TICKET_NOT_FOUND');
        }
        return ticket;
    }

    async listTickets(authUser: AuthUser, query: ListTicketsInput) {
        const filters: Partial<{
            status: TicketStatus;
            priority: TicketPriority;
            created_by_id: string;
            assigned_to_id: string;
        }> = {};

        if (query.status) {
            filters.status = query.status;
        }
        
        if (query.priority) {
            filters.priority = query.priority;
        }

        if(authUser.role == Role.USER) {
            filters.created_by_id = authUser.id
            if(query.assigned_to_id) {
                filters.assigned_to_id = query.assigned_to_id
            }
        }
        else if(authUser.role == Role.AGENT) {
            filters.assigned_to_id = authUser.id
        }
        else {
            if(query.created_by_id) {
                filters.created_by_id = query.created_by_id
            }
            if(query.assigned_to_id) {
                filters.assigned_to_id = query.assigned_to_id
            }
        }        

        const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
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
    async updateTicket(authUser: AuthUser, ticketId: string, input: UpdateTicketsInput) {
        const updateData: Prisma.TicketUncheckedUpdateInput= {}
        if (input.title !== undefined) updateData.title = input.title;

        if (input.description !== undefined) updateData.description = input.description;

        if (input.priority !== undefined) updateData.priority = input.priority;
        const ticket = await this.showTicketById(authUser, ticketId)
        return repository.update(ticketId,updateData)
    }
    async deleteTicket (authUser: AuthUser, ticketId: string) {
        const ticket = await this.showTicketById(authUser, ticketId)
        return repository.delete(ticketId)
    }
}