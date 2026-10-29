import { Router } from "express"
import { TicketController } from "./ticket.controller.js";
import { authUser } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createTicketSchema, listTicketsQuerySchema, ticketIdParamSchema, updateTicketSchema } from "./ticket.schema.js";

export const ticketRoutes = Router();

const controller = new TicketController()

ticketRoutes.use(authUser)
ticketRoutes.post('/',validate({body: createTicketSchema}), controller.createTicket)
ticketRoutes.get('/', validate({query: listTicketsQuerySchema}), controller.listTickets)
ticketRoutes.get('/:id', validate({params: ticketIdParamSchema}), controller.showTicketById)
ticketRoutes.patch('/:id', validate({params: ticketIdParamSchema, body: updateTicketSchema}), controller.updateTicket)
ticketRoutes.delete('/:id', validate({params: ticketIdParamSchema}), controller.deleteTicket)

