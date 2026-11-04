import '../styles/main.css';
import { issues } from "../data";
// import ProjectCard from "./ProjectCard";
import IssueCard from './IssueCard';
import EmptyState from './EmptyState';

export default function Main() {
    return (
        <main>
            <section>
                <h2>Welcome !</h2>
            </section>
            {/* <section id='projects'>
                {projects.length ? (
                    <>                
                        <div className="project-heading">
                            <h2>Projects</h2>
                        </div>
                        <div className="project-grid">
                            {projects.map(project => (
                                <ProjectCard title={project}/>
                            ))}
                        </div>
                    </>
                ):(
                    <EmptyState title='No Projects' description='You have no Projects.'/>
                )}
            </section> */}
            {issues.length ? (
                <>
                    <section id='issues'>
                        <div className="issue-heading">
                            <h2>Issues</h2>
                        </div>
                        <div className="issue-grid">
                            {issues.map(issue => (
                                <IssueCard issue={issue}/>
                            ))}
                        </div>
                    </section>
                </>
            ):(
                <EmptyState title='No issues currently' description='You have no issues to work on.'/>
            )}
        </main>
    )
}