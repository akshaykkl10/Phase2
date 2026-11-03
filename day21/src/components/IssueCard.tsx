import { Badge } from "@/components/ui/badge"
type Level = 'low' | 'medium' | 'high' | 'neutral';

type IssueProp = {
    title: string;
    level: Level;
}

const levelStyles: Record<Level, string> = {
    low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
};

export default function IssueCard({title, level}: IssueProp) {
    const badgeClass = levelStyles[level]
    return (
        <div className="project-card">
            <h5>{title}</h5>
            <Badge className={badgeClass} variant="default">{level}</Badge>
        </div>
    )
}