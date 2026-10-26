import { Router } from "express"
import { TicketController } from "./ticket.controller.js";

export const ticketRoutes = Router();

const controller = new TicketController()

ticketRoutes.post('/', controller.createTicket)
ticketRoutes.get('/', controller.listTickets)
ticketRoutes.get('/:id', controller.showTicketById)
ticketRoutes.patch('/:id', controller.updateTicket)
ticketRoutes.delete('/:id', controller.deleteTicket)

