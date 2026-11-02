type ProjectNameProp = {
    title: string;
}

export default function ProjectCard({title}: ProjectNameProp) {
    return (
        <div className="project-card">
            <h4>{title}</h4>
            
        </div>
    )
}