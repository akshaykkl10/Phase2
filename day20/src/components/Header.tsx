import viteLogo from '../assets/vite.svg'
import Avatar from "./ProfileBadge"
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
            <Avatar name='AK' />
        </header>
    )
}