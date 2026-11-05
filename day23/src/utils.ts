import type React from "react";
import type { Issue, IssuePriority } from "./types";
import { createIssueSchema } from "./zod/issueSchema";
import { ZodError } from "zod";

export function filterIssue(searchInput: string, statusFilter: string, priorityFilter: string, isSortStatus: boolean, issues: Issue[]) {
    const filtered =  issues.filter(issue => {
        const searchFlag = issue.title.toLowerCase().includes(searchInput.toLowerCase())
        || issue.description.toLowerCase().includes(searchInput.toLowerCase())

        const statusFlag = statusFilter === '' || issue.status.toLowerCase().includes(statusFilter.toLowerCase()); 
        const priorityFlag = priorityFilter === '' || issue.priority.toLowerCase().includes(priorityFilter.toLowerCase());
        return searchFlag && statusFlag && priorityFlag
    })
    if(isSortStatus){
        filtered.sort((a,b) => a.status.localeCompare(b.status))
    }
    return filtered
}

export function handleSubmit(event: React.FormEvent<HTMLFormElement>, setState:React.Dispatch<React.SetStateAction<Issue[]>>, issues: Issue[], setOpen: (open: boolean)=> void, setErrors: (errors: Record<string, string[]>) => void) {
    event.preventDefault();
    const form = event.currentTarget;
    const formdata = new FormData(form);
    const title = formdata.get('title') as string;
    const description = formdata.get('description') as string;
    const project = formdata.get('project') as string;
    const priority = formdata.get('priority') as IssuePriority;
    const assignee = formdata.get('assignee') as string;
    const dueDate = formdata.get('duedate') as string;

    // if(!title?.trim() || !description?.trim() || !project?.trim() || !priority?.trim() || !assignee?.trim() || !dueDate?.trim()) return
    const newIssue: Issue = {
        id:(Math.max(0, ...issues.map(issue => {
            return issue.id
        })) + 1),
        title,
        description,
        status: 'Todo',
        priority,
        project,
        assignee,
        dueDate
    };
    try {
        console.log(newIssue)
        const validatedIssue = createIssueSchema.parse(newIssue)
        setState((prevIssues: Issue[]) => [
            ...prevIssues,
            validatedIssue
        ]);
        form.reset();
        if(setOpen)setOpen(false);

    } catch (error) {
        if(error instanceof ZodError) {
            console.log(error.flatten().fieldErrors)
            setErrors(error.flatten().fieldErrors)
        }
    }

}