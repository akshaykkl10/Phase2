import type { Issue } from "./types";

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