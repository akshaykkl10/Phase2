import { getIssues } from "@/utils/issueutils";
import { Link, useParams } from "react-router";

const issues = await getIssues()

export default function IssueDetail() {
    const { id } = useParams();

    const issue = issues.find(issue => issue.id == id)
    if (issue) {
        return (
            <>
                <h2>{issue.title}</h2>
                <h3>{issue.description}</h3>
                <h3>{issue.priority}</h3>
                <h3>{issue.assignee}</h3>
                <h3>{issue.status}</h3>
                <h3>{issue.dueDate}</h3>
                <Link to={'/issues'}>Go Back</Link>
            </>
        )
    } return (
        <>
            <h2>Issue not found </h2>
        </>
    )
}