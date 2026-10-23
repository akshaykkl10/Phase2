import z from 'zod';
import {TicketPriority}  from "../../generated/enums.js"
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});


export const createTicketSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  assignedToId: z.string().min(1).optional()
});

export const ticketIdParamSchema = z.object({
  id: z.string().min(1)
});