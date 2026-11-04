import '../styles/main.css';
import { issues as initIssues }  from "../data";
// import ProjectCard from "./ProjectCard";
import IssueCard from './IssueCard';
import EmptyState from './EmptyState';
import { useState } from 'react';
import { filterIssue } from '@/utils';
import type { Issue, IssuePriority, IssueStatus } from '@/types';
import FilterInputs from './FilterOptions';

export default function Main() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [isSortStatus, setSortStatus] = useState(false);
    const [initialIssues, setState] = useState<Issue[]>(initIssues);
    const renderissues = filterIssue(search, status as IssueStatus, priority as IssuePriority, isSortStatus as boolean, initIssues);
    console.log('phantom');
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

            {initialIssues.length ? (
                <>
                
                    <section id='issues'>
                        <div className="issue-heading">
                            <h2>Issues</h2>
                            <div className='filter-inputs'>
                                <FilterInputs 
                                    search={search} setSearch={setSearch} 
                                    status={status} setStatus={setStatus} 
                                    priority={priority} setPriority={setPriority}
                                    isSortStatus={isSortStatus} setSortStatus={setSortStatus}
                                />
                            </div>
                        </div>
                        <div className="issue-grid">
                            {renderissues.map(renderissue => (
                                <IssueCard issue={renderissue}/>
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