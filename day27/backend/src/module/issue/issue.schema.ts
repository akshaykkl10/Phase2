import z from 'zod';
import {IssuePriority, IssueStatus}  from "../../generated/enums.js"
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});


export const createIssueSchema = z.object({
  project: z.string().min(1),
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  priority: z.nativeEnum(IssuePriority).default(IssuePriority.MEDIUM),
  assigned_to_id: z.string().min(1).optional()
});

export const listIssuesQuerySchema = paginationQuerySchema.extend({
  project: z.string().min(1).optional(),
  status: z.nativeEnum(IssueStatus).optional(),
  priority: z.nativeEnum(IssuePriority).optional(),
  created_by_id: z.string().trim().min(1).optional(),
  assigned_to_id: z.string().trim().min(1).optional()
});

export const updateIssueSchema = z
  .object({
    project: z.string().min(1),
    title: z.string().trim().min(3).max(120).optional(),
    description: z.string().trim().min(10).max(5000).optional(),
    priority: z.nativeEnum(IssuePriority).optional()
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided'
  });

export const issueIdParamSchema = z.object({
  id: z.string().min(1)
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>
export type ListIssuesInput = z.infer<typeof listIssuesQuerySchema>
export type UpdateIssuesInput = z.infer<typeof updateIssueSchema>