import { Router } from "express"
import { TicketController } from "./ticket.controller.js";
import { authUser } from "../../middleware/auth.middleware.js";

export const ticketRoutes = Router();

const controller = new TicketController()

ticketRoutes.use(authUser)
ticketRoutes.post('/', controller.createTicket)
ticketRoutes.get('/', controller.listTickets)
ticketRoutes.get('/:id', controller.showTicketById)
ticketRoutes.patch('/:id', controller.updateTicket)
ticketRoutes.delete('/:id', controller.deleteTicket)

