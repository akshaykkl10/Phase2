import { NavLink } from 'react-router'
import '../styles/sidebar.css'

export default function SideBar() {
    return (
        <div className="sidebar">
            <ul>
                <NavLink to={'/projects'}>Projects</NavLink>
                <NavLink to={'/issues'}>Issues</NavLink>
            </ul>
        </div>
    )
}
