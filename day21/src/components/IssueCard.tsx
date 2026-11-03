import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Issue } from "@/types";


type IssueProp = {
    issue: Issue
}

const colourStyles: Record<string, string> = {
    green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    gray: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
};

export default function IssueCard({issue}: IssueProp) {
    let statusClass: string = colourStyles['gray'];
    let priorityClass: string = colourStyles['gray'];

    if (issue.status == 'Done') statusClass = colourStyles['green']
    else if (issue.status == 'In Progress') statusClass = colourStyles['blue']
    else if (issue.status == 'Todo') statusClass = colourStyles['gray']

    if (issue.priority == 'Low') priorityClass = colourStyles['green']
    else if (issue.priority == 'Medium') priorityClass = colourStyles['yellow']
    else if (issue.priority == 'High') priorityClass = colourStyles['red']

    const today = new Date();
    today.setHours(0,0,0,0);

    const dueDate = new Date(`${issue.dueDate}T00:00:00`);
    const isOverDue = dueDate < today && issue.status != "Done";

    return (
        <Card>

            <CardHeader>
                <CardTitle>{issue.title}</CardTitle>
                <CardDescription>{issue.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Project: {issue.project} </p>
                <p>Assignee: {issue.assignee} </p>
            </CardContent>
            <CardFooter className="flex flex-row flex-wrap items-center justify-center">
                <Badge variant='secondary' className={priorityClass} >{issue.priority} </Badge>
                <Badge variant='outline' className={statusClass}> {issue.status}</Badge>
                {isOverDue && (
                    <Badge variant={'default'} className={colourStyles['red']}>OverDue</Badge>
                )}
            </CardFooter>
        </Card>
    )
}