import '../styles/appshell.css';
import Header from "./Header"
import Main from "./MainComp"
import SideBar from "./SideBar"
export default function AppShell() {
    return (<div className="appshell ">
        <div className="header-div section">
            <Header />
        </div>
        <div className="sidebar-div section">
            <SideBar />
        </div>
        <div className="main-div section">
            <Main />
        </div>
    </div>
    )
}
