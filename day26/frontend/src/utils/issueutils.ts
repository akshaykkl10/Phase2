import { getTickets } from "@/api/apiClient";
import type { IssuesApiResponse } from "./types";
import type { Issue } from "@/types";

export async function getIssues() {
    const response = await getTickets() as IssuesApiResponse;
    const issues = response.data
    const refinedIssues: Issue[] = issues.map((issue) => {
        return {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            project: 'Random Project',
            status: issue.status,
            priority: issue.priority,
            assignee: issue.created_by.name,
            dueDate: issue.createdat
        }
    })
    return refinedIssues
}