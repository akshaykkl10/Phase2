import z from 'zod';
import {TicketPriority, TicketStatus}  from "../../generated/enums.js"
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});


export const createTicketSchema = z.object({
    created_by_id: z.string().trim(),
    category_id: z.string().trim(),
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  assigned_to_id: z.string().min(1).optional()
});

export const listTicketsQuerySchema = paginationQuerySchema.extend({
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(TicketPriority).optional(),
  created_by_id: z.string().trim().min(1).optional(),
  assigned_to_id: z.string().trim().min(1).optional()
});

export const updateTicketSchema = z
  .object({
    title: z.string().trim().min(3).max(120).optional(),
    description: z.string().trim().min(10).max(5000).optional(),
    priority: z.nativeEnum(TicketPriority).optional()
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided'
  });

export const ticketIdParamSchema = z.object({
  id: z.string().min(1)
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>
export type ListTicketsInput = z.infer<typeof listTicketsQuerySchema>
export type UpdateTicketsInput = z.infer<typeof updateTicketSchema>