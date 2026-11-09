import '../styles/main.css';
import { projects }  from "../data";
import ProjectCard from "../components/ProjectCard";
import EmptyState from '../components/EmptyState';

export default function Projects() {
    return (
        <main>
            <section>
                <h2>Welcome !</h2>
            </section>
            <section id='projects'>
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
            </section> 

        </main>
    )
}