import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { handleSubmit } from "@/utils/utils";
import type { Issue } from "@/types";
import type React from "react";
import { useState } from "react";

interface EditIssueProp {
    setState: React.Dispatch<React.SetStateAction<Issue[]>>;
    issues: Issue[]
    issue: Issue
}
export default function EditIssue({setState, issues, issue}: EditIssueProp) {
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-sm">Edit Issue</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Issue details</DialogTitle>
                <form onSubmit={(event) => {
                    handleSubmit({event, setState, issues, issueId: issue.id, setOpen, setErrors})
                }} id="add-issue-form">
                    <label htmlFor="title-input">Title</label>
                    <input className="border border-default-medium border-black/50" type="text" name="title" id="title-input" defaultValue={issue.title}/>
                    {errors.title && (<span className="block sm:inline text-red-400">{errors.title}</span>)}
                    <label htmlFor="description-input">Description</label>
                    <textarea className="border border-default-medium border-black/50" name="description" id="description-input" defaultValue={issue.description}></textarea>
                    {errors.description && (<span className="block sm:inline text-red-400">{errors.description}</span>)}
                    <label htmlFor="project-input">Project</label>
                    <input className="border border-default-medium border-black/50" type="text" name="project" id="project-input" defaultValue={issue.project}/>
                    {errors.project && (<span className="block sm:inline text-red-400">{errors.project}</span>)}
                    <label htmlFor="status-input">Status</label>
                    <select className="border border-default-medium border-black/50" name="status" id="status-input" defaultValue={issue.status}>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    {errors.status && (<span className="block sm:inline text-red-400">{errors.status}</span>)}
                    <label htmlFor="priority-input">Priority</label>
                    <select className="border border-default-medium border-black/50" name="priority" id="priority-input" defaultValue={issue.priority}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priority && (<span className="block sm:inline text-red-400">{errors.priority}</span>)}
                    <label htmlFor="assignee-input">Assignee</label>
                    <input className="border border-default-medium border-black/50" type="text" name="assignee" id="assignee-input" defaultValue={issue.assignee}/>
                    {errors.assignee && (<span className="block sm:inline text-red-400">{errors.assignee}</span>)}
                    <label htmlFor="duedate-input">DueDate</label>
                    <input className="border border-default-medium border-black/50" type="date" name="duedate" id="duedate-input" defaultValue={issue.dueDate}/>
                    {errors.dueDate && (<span className="block sm:inline text-red-400">{errors.dueDate}</span>)}
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-sm" type="submit">Submit Edit</button>
                </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}