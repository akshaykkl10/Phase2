import '../styles/main.css';
import { issues, projects } from "../data";
import ProjectCard from "./ProjectCard";
import IssueCard from './IssueCard';

export default function Main() {
    return (
        <main>
            <section>
                <h2>Welcome !</h2>
            </section>
            <section id='projects'>
                <div className="project-heading">
                    <h2>Projects</h2>
                </div>
                <div className="project-grid">
                    {projects.map(project => (
                        <ProjectCard title={project}/>
                    ))}
                </div>
            </section>
             <section id='issues'>
                <div className="issue-heading">
                    <h2>Projects</h2>
                </div>
                <div className="issue-grid">
                    {issues.map(issue => (
                        <IssueCard title={issue.title} level={issue.level}/>
                    ))}
                </div>
            </section>
        </main>
    )
}