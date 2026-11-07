import '../styles/appshell.css';
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Outlet } from 'react-router';
export default function AppLayout() {
    return (<div className="appshell ">
        <div className="header-div section">
            <Header />
        </div>
        <div className="sidebar-div section">
            <SideBar />
        </div>
        <div className="main-div section">
            <Outlet />
        </div>
    </div>
    )
}
