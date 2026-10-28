import type { Request, Response} from 'express';
import type { CreateTicketInput, ListTicketsInput, UpdateTicketsInput } from "./ticket.schema.js";
import { TicketService } from "./ticket.service.js";

const service = new TicketService()

export class TicketController {
    async createTicket(request: Request, response: Response) {
        const ticket = await service.createTicket(request.user, request.body as CreateTicketInput)
        response.status(201).json({data: ticket})
    }
    async showTicketById(request: Request, response: Response) {
        const ticket = await service.showTicketById(request.user, request.params.id as string)
        response.status(201).json({data: ticket})
    }
    async listTickets(request: Request, response: Response) {
        const tickets = await service.listTickets(request.user, request.query as unknown as ListTicketsInput)
        response.status(201).json(tickets)
    }
    async updateTicket(request: Request, response: Response) {
        const ticket = await service.updateTicket(
            request.user, 
            request.params.id as string,
            request.body as UpdateTicketsInput
        )
        response.status(201).json({data: ticket})
    }
    async deleteTicket(request: Request, response: Response) {
        await service.deleteTicket(request.user, request.params.id as string)
        response.status(204).end()
    }
}