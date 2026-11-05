import viteLogo from '../assets/vite.svg'
import ProfieAvatar from "./ProfileAvatar"
import '../styles/header.css'
export default function Header() {
    return (
        <header className="header">
            <img src={viteLogo} alt="Profile Badge" />
            <h1>React App</h1>
            <nav>
                <ul id='header-links'>
                    <li>Home</li>
                    <li>About</li>
                </ul>
            </nav>
            <ProfieAvatar name='Akshay Kumar P' />
        </header>
    )
}