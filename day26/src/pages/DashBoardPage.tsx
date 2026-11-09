import '../styles/main.css';
import { issues }  from "../data";
import { projects } from '../data';

export default function Dashboard() {
    return (
        <main>
            <section>
                <h2>Welcome !</h2>
            </section>
            <section>
                <h3>You have {projects.length} Projects</h3>
            </section>
            <section>
                <h3>You have {issues.length} Issues</h3>
            </section>
        </main>
    )
}