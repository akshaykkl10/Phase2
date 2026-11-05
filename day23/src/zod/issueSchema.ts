import z from "zod";

export const createIssueSchema = z.object({
    id: z.coerce.number().min(1),
    title: z.string({
        message: "Title is required."
    }).trim().min(1, {
        message: "Enter characters for Title."
    }).max(500, {
        message: "Title exceeded 500 characters."
    }),

    description: z.string({
        message: "Description is required."
    }).trim().min(1, {
        message: "Enter characters for Description."
    }).max(5000, {
        
        message: "Description exceeded 5000 characters."
    }),
    status: z.enum(['Todo', 'In Progress', 'Done'], {
        message: " Status must be 'Todo' | 'In Progress' | 'Done'"
    }),

    priority: z.enum(['Low', 'Medium', 'High'], {
        message: " Priority must be 'Low' | 'Medium' | 'High'"
    }),

    project: z.string({
        message: "Project is required."
    }).trim().min(1, {
        message: "Enter characters for Project."
    }).max(500, {
        message: "Project exceeded 5000 characters."
    }),

    assignee: z.string({
        message: "Assignee is required."
    }).trim().min(1, {
        message: "Enter characters for Assignee."
    }).max(500, {
        message: "Assignee exceeded 5000 characters."
    }),
    
    dueDate: z.string({
        message: "Due Date is required."
    }).refine((dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        return date >= today;
    }, {
        message: "Due Date must be today or in the future",
    })
})