import z from 'zod';
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});


export const createProjectSchema = z.object({
  name: z.string().trim().min(3).max(120),
});

export const updateProjectSchema = z
  .object({
    name: z.string().trim().min(3).max(120).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided'
  });

export const projectIdParamSchema = z.object({
  id: z.string().min(1)
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectsInput = z.infer<typeof updateProjectSchema>