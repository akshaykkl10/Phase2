import Badge, { type variant } from "./Badge";
type level = 'low' | 'medium' | 'high' | 'neutral';

type IssueProp = {
    title: string;
    level: level;
}

const levelToLabel = {
    low: 'green',
    medium: 'yellow',
    high: 'red',
    neutral: 'gray'
}

export default function IssueCard({title, level}: IssueProp) {
    return (
        <div className="project-card">
            <h5>{title}</h5>
            <Badge label={level} variant={levelToLabel[level as level] as variant}/>
        </div>
    )
}