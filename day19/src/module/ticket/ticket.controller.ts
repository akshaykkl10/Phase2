import type { Request, Response} from 'express';
import type { CreateTicketInput, ListTicketsInput, UpdateTicketsInput } from "./ticket.schema.js";
import { TicketService } from "./ticket.service.js";
import {debug} from './ticket.router.js'

const service = new TicketService()

export class TicketController {
    async createTicket(request: Request, response: Response) {
        debug('Sending data to ticket service')
        const ticket = await service.createTicket(request.user, request.body as CreateTicketInput)
        response.status(201).json({data: ticket})
        debug('response created')
    }
    async showTicketById(request: Request, response: Response) {
        debug('Sending data to ticket service')
        const ticket = await service.showTicketById(request.user, request.params.id as string)
        response.status(200).json({data: ticket})
        debug('response created')
    }
    async listTickets(request: Request, response: Response) {
        debug('Sending data to ticket service')
        const tickets = await service.listTickets(request.user, request.query as unknown as ListTicketsInput)
        response.status(200).json(tickets)
        debug('response created')
    }
    async updateTicket(request: Request, response: Response) {
        debug('Sending data to ticket service')
        const ticket = await service.updateTicket(
            request.user, 
            request.params.id as string,
            request.body as UpdateTicketsInput
        )
        response.status(200).json({data: ticket})
        debug('response created')
    }
    async deleteTicket(request: Request, response: Response) {
        debug('Sending data to ticket service')
        await service.deleteTicket(request.user, request.params.id as string)
        response.status(204).end()
        debug('response created')
    }
}